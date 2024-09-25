import { useState, useEffect } from 'react';
import { Product } from './types/types';
import productsService from './services/products';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await productsService.getAll();
      setProducts(products);
    };

    getProducts();
  }, []);

  console.log(products);
  return (
    <>
      <div></div>
    </>
  );
};

export default App;
