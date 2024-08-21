import { Request, Response, Router } from 'express';
import { Product as ProductModel } from '#src/models';
import { processProductQueryParameters } from '#src/middleware/productQueryParametersProcessor';
import tokenExtractor from '#src/middleware/tokenExtractor';
import { Product } from '#src/types/types';
import { toProduct, parseString } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

// Get products
router.get(
  '/',
  processProductQueryParameters,
  async (req: Request, res: Response) => {
    const products: ProductModel[] | [] = await ProductModel.findAll(
      req.searchParameters
    );
    res.json(products);
  }
);

// Get single product by database primary key
router.get(
  '/:id',
  processProductQueryParameters,
  async (req: Request, res: Response) => {
    const id: string = parseString(req.params.id);
    const product: ProductModel | null = await ProductModel.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json('Product not found');
    }
  }
);

// Add new product
router.post('/', tokenExtractor, async (req: Request, res: Response) => {
  if (!req.isadmin) {
    res.status(400)
  }
  const newProduct: Product = toProduct(req.body);
  newProduct.id = uuidv4();
  const addedProduct: ProductModel = await ProductModel.create({
    ...newProduct
  });
  res.json(addedProduct);
});

// Update existing product
router.put('/:id', tokenExtractor, async (req: Request, res: Response) => {
  const id: string = parseString(req.params.id);
  const product: ProductModel | null = await ProductModel.findByPk(id);
  const updatedProduct: Product = toProduct(req.body);

  if (product) {
    const productWithUpdatedValues: Product = toProduct({
      ...product,
      ...updatedProduct
    });
    await product.update(productWithUpdatedValues);
    const saveResult: ProductModel = await product.save();
    res.json(saveResult);
  } else {
    res.status(404).json('Product not found');
  }
});

// Delete product
router.delete('/:id', tokenExtractor, async (req: Request, res: Response) => {
  const product: ProductModel | null = await ProductModel.findByPk(
    req.params.id
  );

  if (product) {
    await product.destroy();
    res.status(204).end();
  } else {
    res.status(404).json('Product not found');
  }
});

export default router;
