import express from 'express'
import { products } from '../../data/data.json'

const router = express.Router()

router.get('/', (_req, res) => {
  //const ids = products.map(product => product.id)
  res.send(products)
});

router.get('/:id', (req, res) => {
  const product = products.find(product => req.params.id === product.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404)
  }
})

export default router