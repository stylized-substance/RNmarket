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

  console.log('cartItems', cartItems);

  return (
    <Container className="pe-3">
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
          <Row key={item.product.id} className="p-4 border-bottom">
            <Col id="cart-product-image" className="flex-shrink-0">
              {item.product.imgs && (
                <Image
                  src={item.product.imgs[0]}
                  thumbnail
                  style={{ height: '150px', width: '150px' }}
                  className="object-fit-scale border-0"
                />
              )}
            </Col>
            <Col>
              <Stack gap={2}>
                <Link
                  to={`/products/${item.product.id}`}
                  className="text-light"
                >
                  <b>{item.product.title}</b>
                </Link>
                <i>{item.product.price}€</i>
              </Stack>
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
                  style={{ width: '40px' }}
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
    </Container>
  );
};

export default CartMenu;
