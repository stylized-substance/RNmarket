import { useState, useEffect } from 'react';

import { Product } from '#src/types/types';
import productsService from '#src/services/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCards from '#src/components/ProductCards';

interface ProductsProps {
  productCategory: string;
}

const Products = (props: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products: Product[] = await productsService.getAll(props);
      setProducts(products);
    };

    void getProducts();
  }, [props]);

  return (
    <Container>
      <Row>
        <Col className="text-center m-4">
          <h1>{props.productCategory}</h1>
        </Col>
      </Row>
      <ProductCards products={products} />
    </Container>
  );
};

export default Products;
