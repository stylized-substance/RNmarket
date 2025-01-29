import { backendAddress } from '#src/utils/config.ts';
import { padPrice } from '#src/utils/padPrice.ts';

import { useCart } from '#src/context/CartContext.tsx';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
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
      className="justify-content-between border-0 mb-5"
    >
      <Link to={`/products/${props.product.id}`} key={props.product.id}>
        <div
          style={{ height: 200 }}
          className="d-flex justify-content-center align-items-center"
        >
          <Card.Img
            variant="top"
            src={imageUrl}
            style={{ maxHeight: 200, objectFit: 'contain' }}
          />
        </div>
        <Card.Body>
          <Card.Title
            style={{ height: 100 }}
            className="text-truncate text-wrap"
          >
            {props.product.title}
          </Card.Title>
          <Card.Subtitle className="fs-5 mt-2 text-danger">
            {padPrice(props.product.price)}€
          </Card.Subtitle>
        </Card.Body>
      </Link>
      <Button
        size="lg"
        style={{ width: 140 }}
        onClick={() =>
          cart.dispatch({
            type: 'added',
            payload: { product: props.product, quantity: 1 }
          })
        }
        className="custom-button align-self-center"
      >
        Add to cart
      </Button>
    </Card>
  );
};

const ProductCards = (props: ProductCardsProps) => {
  return (
    <Row lg={4}>
      {props.products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Row>
  );
};

export default ProductCards;
