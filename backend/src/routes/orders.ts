import { Request, Response, Router } from 'express';
import { Order as OrderModel } from '#src/models'
import { Product as ProductModel } from '#src/models'
import { NewOrder, Order } from '#src/types/types'
import { toNewOrder } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const orders: OrderModel[] = await OrderModel.findAll()

  if (orders.length === 0) {
    return res.status(400).json({ Message: 'No orders found in database'})
  }

  return res.json({ orders })
})

router.post('/', async (req: Request, res: Response) => {
  const newOrder: NewOrder = toNewOrder(req.body)
  const orderWithId: Order = {
    ...newOrder,
    id: uuidv4()
  }

  // Test each product ID for a corresponding product in database
  for (const product_id of newOrder.product_ids) {
    const productInDb: ProductModel | null = await ProductModel.findByPk(product_id)
    if (!productInDb) {
      return res.status(400).json({ Error: `Product for id ${product_id} not found in database, order failed.` })
    }
  }

  console.log('here')

  await OrderModel.create(orderWithId)
  return res.status(201).end
})

export default router