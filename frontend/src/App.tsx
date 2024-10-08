import './styles/custom.css'
import { useState, useEffect } from 'react';
import { Product } from './types/types';
import productsService from './services/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Container style={{ marginTop: "60px" }}>
      <Navbar fixed="top" expand="sm" className="navbar">
        <Navbar.Brand>RNmarket</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link style={{ color:"white" }}>Home</Nav.Link>
          </Nav>
          <Form className="w-100 ms-2 me-2">
            <Form.Control type="search" placeholder="Search" />
          </Form>
          <Button variant="light">
            Login
          </Button>
        </Navbar.Collapse>
      </Navbar>
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
