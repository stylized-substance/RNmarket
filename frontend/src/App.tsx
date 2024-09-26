import { useState, useEffect } from 'react';
import { Product } from './types/types';
import productsService from './services/products';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products: Product[] = await productsService.getAll();
      setProducts(products);
      await productsService.getOne(products[0].id)
    };

    void getProducts();
  }, []);

  const productsMapped = products.map((product) => (
    <li key={product.id}>{product.title}</li>
  ));

  return (
    <>
      <div>
        <ul>{productsMapped}</ul>
      </div>
    </>
  );
};

export default App;
