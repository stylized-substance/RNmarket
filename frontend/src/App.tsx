import './styles/custom.css';

import { useState, useEffect } from 'react';
import { Product } from './types/types';
import productsService from './services/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import NavBar from './components/NavBar';

const App = () => {
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
    <Container style={{ marginTop: '60px' }}>
      <NavBar />      
      <h1>All products</h1>
      <Row lg={6}>
        {productsToCards.map((card) => (
          <Col key={card.key}>{card}</Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
