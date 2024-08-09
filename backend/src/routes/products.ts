import { Request, Response, Router } from 'express';
import { Product } from '#src/models';
import { processProductQueryParameters } from '#src/middleware/processProductQueryParameters';

const router = Router();

// Get products
router.get(
  '/',
  processProductQueryParameters,
  async (req: Request, res: Response) => {
    const products = await Product.findAll(req.searchParameters);
    res.json(products);
  }
);

// Get single product filtering by database column
router.get(
  '/',
  processProductQueryParameters,
  async (req: Request, res: Response) => {
    const product = await Product.findOne(req.searchParameters)
    if (product) {
      res.send(product)
    } else {
      res.status(404).send('Product not found')
    }
  }
)

// Get single product by database primary key
router.get(
  '/:id',
  processProductQueryParameters,
  async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Product not found');
    }
  }
);


export default router;
