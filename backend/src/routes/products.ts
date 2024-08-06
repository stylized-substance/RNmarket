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

// router.get('/:id', (req, res) => {
//   const product = products.find((product) => req.params.id === product.original_id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404);
//   }
// });

export default router;
