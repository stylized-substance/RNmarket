import express from 'express';
import { isNumber } from '#src/utils/typeNarrowers';
import { products } from '../../data/data.json';
let data = products;

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.limit) {
    if (isNumber(req.query.limit)) {
      const limit: number = req.query.limit;
      data = data.slice(0, limit);
    }
  }
  res.send(data);
});

router.get('/:id', (req, res) => {
  const product = products.find((product) => req.params.id === product.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404);
  }
});

export default router;
