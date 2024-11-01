import { backendAddress } from '#src/utils/config.ts';

import { Product } from '#src/types/types';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'

interface ProductCardsProps {
  products: Product[];
}

const ProductCards = (props: ProductCardsProps) => {
  const productsToCards = props.products.map((product) => {
    let imageUrl = '';
    if (product.imgs !== null && product.imgs !== undefined) {
      imageUrl = `${backendAddress}${product.imgs[0]}`;
    }

    return (
      <Link to={`/products/${product.id}`} key={product.id}>
        <Card>
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
      </Link>
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
