import { useState, useEffect } from 'react';

import { Product } from '#src/types/types';
import productsService from '#src/services/products';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products: Product[] = await productsService.getAll();
      setProducts(products);
    };

    void getProducts();
  }, []);

  const productsToCards = products.map((product) => {
    let imageUrl = '';
    if (product.imgs !== null && product.imgs !== undefined) {
      imageUrl = `http://localhost:3003${product.imgs[0]}`;
    }

    return (
      <Card key={product.id}>
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{ height: 200, width: 'auto' }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle>{product.price}</Card.Subtitle>
          <Card.Text>{product.specs[0].substring(0, 20)}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container>
      <h1>All products</h1>
      <Row lg={6}>
        {productsToCards.map((card) => (
          <Col key={card.key}>{card}</Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
