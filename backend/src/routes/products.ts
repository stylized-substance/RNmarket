import { Request, Response, Router } from 'express';
import { Product } from '#src/models';
// import productFinder from '#src/middleware/productFinder';
import { processProductQueryParameters } from '#src/middleware/processProductQueryParameters';
import { toProduct } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

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

// Get single product filtering by database column. findByPk method doesn't support WHERE clauses, this allows it by adding 'id' as query paramter.
router.get(
  '/',
  processProductQueryParameters,
  async (req: Request, res: Response) => {
    const product = await Product.findOne(req.searchParameters);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Product not found');
    }
  }
);

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

// Add new product
router.post('/', async (req: Request, res: Response) => {
  const newProduct = toProduct(req.body);
  newProduct.id = uuidv4();
  const addedProduct = await Product.create({ ...newProduct });
  res.json(addedProduct);
});

export default router;
