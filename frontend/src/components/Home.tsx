import { useState, useEffect } from 'react';

import { Product } from '#src/types/types';
import productsService from '#src/services/products';

import Container from 'react-bootstrap/Container';
import ProductCards from '#src/components/ProductCards';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products: Product[] = await productsService.getAll();
      setProducts(products);
    };

    void getProducts();
  }, []);

  return (
    <Container>
      <h1>All products</h1>
      <ProductCards products={products} />
    </Container>
  );
};

export default Home;
