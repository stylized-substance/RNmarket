import { Product } from '#src/types/types';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProductCardsProps {
  products: Product[];
}

const ProductCards = (props: ProductCardsProps) => {
  const productsToCards = props.products.map((product) => {
    let imageUrl = '';
    if (product.imgs !== null && product.imgs !== undefined) {
      imageUrl = `http://localhost:3003${product.imgs[0]}`;
    }

    return (
      <a href={`/products/${product.id}`} key={product.id}>
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
      </a>
    );
  });

  return (
    <Row lg={6}>
      {productsToCards.map((card) => (
        <Col key={card.key}>{card}</Col>
      ))}
    </Row>
  );
};

export default ProductCards;
