import { backendAddress } from '#src/utils/config.ts';
import { padPrice } from '#src/utils/padPrice.ts';

import { useCart } from '#src/context/CartContext.tsx';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { Product } from '#src/types';

const ProductCard = ({ product }: { product: Product }) => {
  const cart = useCart();

  let imageUrl = '';
  if (product.imgs !== null && product.imgs !== undefined) {
    imageUrl =
      process.env.NODE_ENV === 'production'
        ? `${product.imgs[0]}`
        : `${backendAddress}${product.imgs[0]}`;
  }

  return (
    <Card
      id="product-card-container"
      className="border-0 mb-5 justify-content-between"
    >
      <Link to={`/products/${product.id}`} key={product.id} id="image-link">
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{
            aspectRatio: '1 / 1',
            objectFit: 'contain'
          }}
        />
      </Link>
      <Link to={`/products/${product.id}`} key={product.id + 1} id="title-link">
        <Card.Body>
          <Card.Title className="text-truncate text-wrap">
            {product.title}
          </Card.Title>
          <Card.Subtitle className="fs-5 mt-2 text-danger">
            {padPrice(product.price)}€
          </Card.Subtitle>
        </Card.Body>
      </Link>
      <Button
        disabled={product.instock === 0}
        size="lg"
        onClick={() =>
          cart.dispatch({
            type: 'added',
            payload: { product: product, quantity: 1 }
          })
        }
        className="custom-button align-self-center"
      >
        Add to cart
      </Button>
    </Card>
  );
};

const ProductCards = ({ products }: { products: Product[] }) => {
  return (
    <Row lg={4}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Row>
  );
};

export default ProductCards;
