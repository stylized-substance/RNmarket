import { backendAddress } from '#src/utils/config.ts';
import { padPrice } from '#src/utils/padPrice.ts';

import { useCart } from '#src/context/CartContext.tsx';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { Product } from '#src/types/types';

interface ProductCardsProps {
  products: Product[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const cart = useCart();

  let imageUrl = '';
  if (props.product.imgs !== null && props.product.imgs !== undefined) {
    imageUrl = `${backendAddress}${props.product.imgs[0]}`;
  }

  return (
    <Card
      id="product-card-container"
      style={{ height: '473px' }}
      className="justify-content-between"
    >
      <Link to={`/products/${props.product.id}`} key={props.product.id}>
        <div className="d-flex justify-content-center align-items-end">
          <Card.Img
            variant="top"
            src={imageUrl}
            style={{ height: 200, width: 'auto' }}
          />
        </div>
        <Card.Body>
          <Card.Title>{props.product.title}</Card.Title>
          <Card.Subtitle className="fs-5 mt-2 mb-4">
            {padPrice(props.product.price)}€
          </Card.Subtitle>
          <Card.Text className="text-truncate">
            {props.product.specs[0]}
          </Card.Text>
        </Card.Body>
      </Link>
      <Button
        size="lg"
        onClick={() =>
          cart.dispatch({
            type: 'added',
            payload: { product: props.product, quantity: 1 }
          })
        }
        className="custom-button"
      >
        Add to cart
      </Button>
    </Card>
  );
};

const ProductCards = (props: ProductCardsProps) => {
  return (
    <Row lg={6}>
      {props.products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Row>
  );
};

export default ProductCards;
