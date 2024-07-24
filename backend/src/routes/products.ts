import express from 'express';
import { isNumber } from '#src/utils/typeNarrowers';
import { Product, Review } from '#src/models';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.limit) {
    if (isNumber(req.query.limit)) {
      const limit: number = req.query.limit;
      limit
    }
  }

  const products = Product.findAll({
    include: {
      model: Review
    }
  })
  res.send(products);
});

// router.get('/:id', (req, res) => {
//   const product = products.find((product) => req.params.id === product.original_id);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404);
//   }
// });

export default router;
