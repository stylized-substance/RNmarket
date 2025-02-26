import { Request, Response, Router } from 'express';
import tokenExtractor from '#src/middleware/tokenExtractor';
import { Order as OrderModel } from '#src/models';
import { Product as ProductModel } from '#src/models';
// import { ProductOrder as ProductOrderModel } from '#src/models';
import { NewOrder, OrderInDb } from '#src/types/types';
import { OrderForFrontend } from '#src/types/types';
import { toNewOrder, parseString } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

// Get all orders, including their products
router.get('/', tokenExtractor, async (req: Request, res: Response) => {
  if (!req.verifiedToken.isadmin) {
    return res.status(400).json({ Error: 'Only admin users can list orders' });
  }

  // TODO: fix typing, etc.

  // const orders: OrderModel[] = await OrderModel.findAll({
  //   include: ProductModel
  // });

  const orders: OrderModel[] = await OrderModel.findAll({
    include: [{
      model: ProductModel,
      through: {
        attributes: ['quantity'] // Include product quantity from junction table
      }
  }]
  });


  // Build response object for frontend
  // const stringifiedOrders = JSON.stringify(orders, null, 2)
  const JSONOrders = orders.map((order) => order.toJSON())
  // console.log(JSONOrders)
  JSONOrders.forEach((order) => console.log(order.Products))

  const ordersForFrontend: OrderForFrontend[] = JSONOrders.map((order) => {
    return {
      id: order.id,
      email: order.email,
      name: order.name,
      address: order.address,
      zipcode: order.zipcode,
      city: order.city,
      country: order.country,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      products: order.Products.map((product: {id: string; ProductOrder: { quantity: 1 }}) => {
        return {
          id: product.id,
          quantity: product.ProductOrder.quantity
        }
      })
    }
  })
  

  // const ordersForFrontend: OrderForFrontend[] = stringifiedOrders.map((order) => {
  //   return {
  //     id: order.id,
  //     email: order.email,
  //     name: order.name,
  //     address: order.address,
  //     zipcode: order.zipcode,
  //     city: order.city,
  //     country: order.country,
  //     createdAt: order.createdAt,
  //     updatedAt: order.updatedAt,
  //     products: order.Products.map((product) => {
  //       id: product.id,
  //       quantity: product.ProductOrder.quantity
  //     })
  //   }
  // })


  // const ordersForFrontend: OrderForFrontend[] = stringifiedOrders.map((order) => {
  //   return {
  //     id: order.id,
  //     email: order.email,
  //     name: order.name,
  //     address: order.address,
  //     zipcode: order.zipcode,
  //     city: order.city,
  //     country: order.country,
  //     createdAt: order.createdAt,
  //     updatedAt: order.updatedAt,
  //     products: order.Products.map((product) => {
  //       id: product.id,
  //       quantity: product.ProductOrder.quantity
  //     })
  //   }
  // })
  // console.log(orders[1].dataValues.Products)
  // console.log(ordersForFrontend)

  // console.log(orders[0].dataValues.Products[0].dataValues.ProductOrder.dataValues.quantity)

  
  // orders = orders.map((order) => {
  //   order.dataValues
  //   const orderProducts: ProductModel[] = order.dataValues.Products.dataValues.map((product) => product.dataValues)

  //   return {
  //     ...order.dataValues,
  //     products: orderProducts
  //   };
  // });

  // console.log('orders', orders)
  // for (const order of orders) {
  //   console.log(order.dataValues)
  // }

  return res.json({ ordersForFrontend });
});

// Add new order
router.post('/', tokenExtractor, async (req: Request, res: Response) => {
  // Create new order object
  const newOrder: NewOrder = toNewOrder(req.body);

  // Send error if quantity of any product is '0'
  for (const product of newOrder.products) {
    if (product.quantity < 1) {
      return res.status(400).json({
        Error: `You're trying to order product ${product.id} with quantity '0', order failed`
      });
    }
  }

  // Test each product ID in new  order for a corresponding product in database. Send error if client is trying to add non-existent product to order.
  const productIds: string[] = newOrder.products.map((product) => product.id);

  const productsInDb: ProductModel[] = await ProductModel.findAll({
    where: {
      id: productIds
    }
  });

  if (productsInDb.length !== productIds.length || productsInDb.length === 0) {
    return res.status(400).json({
      Error: `One or more products not found in database, order failed.`
    });
  }

  // Check that all products are in stock, send error if not
  productsInDb.forEach((product) => {
    if (product.dataValues.instock < 1) {
      const id = product.dataValues.id;
      return res
        .status(400)
        .json({ Error: `Product ${id} not in stock, order failed` });
    } else {
      return;
    }
  });

  // Add Id to order
  const orderWithId: OrderInDb = {
    id: uuidv4(),
    ...newOrder
  };

  // Create order in database
  const orderInDb: OrderModel = await OrderModel.create(orderWithId);

  // Add products to order in database. Save quantity of each product to junction table. Subtract that amount from 'instock' property of product and update product in database
  for (const product of productsInDb) {
    // Find product in 'newOrder' array and extract quantity of product
    const orderProduct = newOrder.products.find(
      (orderProduct) => orderProduct.id === product.dataValues.id
    );
    if (!orderProduct) {
      return res.status(500).json({
        Error: `Product ${product.dataValues.id}: No match found between product in database and product in new order`
      });
    }
    const productQuantity: number = orderProduct.quantity;

    // Send error if there's not enough product in stock
    if (productQuantity > product.dataValues.instock) {
      return res.status(400).json({
        Error: `Product ${product.dataValues.id}: Not enough product in stock, order failed`
      });
    }

    // Add products to order in database
    // @ts-expect-error - Sequelize model pecial methods/mixins don't seem to work with Typescript
    await orderInDb.addProduct(product, {
      through: { quantity: productQuantity }
    });

    // Subtract amount ordered from product 'instock' value and update in database
    await product.update({
      instock: product.dataValues.instock - orderProduct.quantity
    });
  }

  return res.status(201).json({ orderInDb: orderInDb });
});

// Delete order
router.delete('/:id', tokenExtractor, async (req: Request, res: Response) => {
  if (!req.verifiedToken.isadmin) {
    return res
      .status(400)
      .json({ Error: 'Only admin users can delete orders' });
  }

  // Find order in database
  const id: string = parseString(req.params.id);
  const order: OrderModel | null = await OrderModel.findByPk(id);

  if (!order) {
    return res.status(404).json({ Error: 'Order not found' });
  }

  // If order was found, remove product-order associations from junction table and finally the order from orders table
  // @ts-expect-error - Sequelize model pecial methods/mixins don't seem to work with Typescript
  await order.setProducts([]);
  await order.destroy();
  return res.status(204).end();
});

export default router;
