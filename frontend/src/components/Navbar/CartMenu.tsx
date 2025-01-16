import { useCart } from '#src/context/CartContext.tsx';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { CartItem } from '#src/types/types.ts';

const CartMenu = () => {
  const cart = useCart();
  const cartItems = cart.state;

  const navigate = useNavigate();

  const handleIncrease = (item: CartItem) => {
    cart.dispatch({
      type: 'modified',
      payload: { product: item.product, quantity: item.quantity + 1 }
    });
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity - 1 < 1) {
      return;
    }

    cart.dispatch({
      type: 'modified',
      payload: { product: item.product, quantity: item.quantity - 1 }
    });
  };

  const handleRemove = (item: CartItem) => {
    cart.dispatch({
      type: 'removed',
      payload: item
    });
  };

  return (
    <Col className="d-flex flex-column">
      <Row className="justify-content-center">
        <Button
          onClick={() => navigate('/cart')}
          className="custom-button w-50 mb-4 mt-4"
        >
          Go to cart
        </Button>
      </Row>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Row
            key={item.product.id}
            style={{ height: 400 }}
            className="p-4 border-bottom align-items-start flex-nowrap"
          >
            <Col
              id="cart-product-image"
              //style={{ maxWidth: '10%'}}
              className="d-flex flex-column"
            >
              {item.product.imgs && (
                <Image
                  src={item.product.imgs[0]}
                  style={{ height: 100, width: 100, objectFit: 'contain' }}
                  className="align-self-start"
                />
              )}
            </Col>
            <Col className="h-50 border">
              <Row>
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-light"
                >
                  <b 
                  className="text-truncate text-wrap"
                  >
                    {item.product.title}
                  </b>
                </Link>
              </Row>
              <Row>
                <i className="text-danger">{item.product.price}€</i>
              </Row>
            </Col>
            <Col>
              <Stack direction="horizontal" gap={3}>
                <Button
                  style={{ background: 'black' }}
                  onClick={() => handleDecrease(item)}
                  disabled={item.product.instock === 0}
                  className="border"
                >
                  -
                </Button>
                <Badge
                  bg="light"
                  text="dark"
                  className="fs-6 border"
                >
                  {item.quantity}
                </Badge>
                <Button
                  style={{ background: 'black' }}
                  onClick={() => handleIncrease(item)}
                  disabled={item.product.instock === 0}
                  className="border"
                >
                  +
                </Button>
                <Button
                  style={{ background: 'firebrick' }}
                  onClick={() => handleRemove(item)}
                  className="border"
                >
                  <i className="bi bi-trash3"></i>
                </Button>
              </Stack>
            </Col>
          </Row>
        ))
      ) : (
        <Row className="text-center">
          <h4>Cart is empty</h4>
        </Row>
      )}
    </Col>
  );
};

export default CartMenu;
