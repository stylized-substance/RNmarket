import express from 'express';
import { isNumber } from '#src/utils/typeNarrowers';
import { Product, Review } from '#src/models';

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.query.limit) {
    if (isNumber(req.query.limit)) {
      const limit: number = req.query.limit;
      limit;
    }
  }

  const products = await Product.findAll({
    include: {
      model: Review
    }
  });

  const reviews = await Review.findAll({});
  console.log(reviews);
  console.log(products[1]);
  res.json(products);
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
