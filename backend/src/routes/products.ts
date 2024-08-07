import { Request, Response, Router } from 'express';
import { Product } from '#src/models';
import { processProductQueryParameters } from '#src/utils/middleware';

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

// Get single product by ID
router.get('/:id', async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Product not found');
  }
});

export default router;
