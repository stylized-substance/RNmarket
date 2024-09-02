import { Request, Response, Router } from 'express';
import { Order as OrderModel } from '#src/models';
import { Product as ProductModel } from '#src/models';
import { NewOrder } from '#src/types/types';
import { toNewOrder } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

// Get all orders, including their products
router.get('/', async (_req: Request, res: Response) => {
  const orders: OrderModel[] = await OrderModel.findAll({
    include: ProductModel
  });

  if (orders.length === 0) {
    return res.status(400).json({ Message: 'No orders found in database' });
  }

  return res.json({ orders });
});

// Add new order
router.post('/', async (req: Request, res: Response) => {
  // Create new order object
  const newOrder: NewOrder = toNewOrder(req.body);

  // Test each product ID in new  order for a corresponding product in database. Send error if client is trying to add non-existent product to order.
  const productIds = newOrder.product_ids;

  const productsInDb = await ProductModel.findAll({
    where: {
      id: productIds
    }
  });

  if ((productsInDb.length !== productIds.length) || productsInDb.length === 0) {
    return res.status(400).json({
      Error: `One or more products not found in database, order failed.`
    });
  }

  // Add Id to order
  const orderWithId = {
    name: newOrder.name,
    address: newOrder.address,
    id: uuidv4(),
    product_ids: productsInDb[0].dataValues.id
  };

  // Create order in database
  const orderInDb: OrderModel = await OrderModel.create(orderWithId);

  // Add products to order in database
  // @ts-expect-error - addProducts method doesn't seem to work with Typescript
  await orderInDb.addProducts(productsInDb);

  return res.status(201).json({ orderInDb: orderInDb });
});

export default router;
