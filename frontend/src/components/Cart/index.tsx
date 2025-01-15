import { useCart } from '#src/context/CartContext.tsx';
import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import CartProducts from '#src/components/Cart/CartProducts';

const Cart = () => {
  // Import cart context
  const cart = useCart();
  const cartItems = cart.state;

  const navigate = useNavigate();

  const cartTotalPrice =
    cartItems && cartItems.length > 0
      ? Number(
          cartItems
            .map((item) => item.product.price * item.quantity)
            .reduce((total, item) => total + item)
            .toFixed(2)
        )
      : 0;

  return (
    <>
      <Row style={{ marginBottom: '100px' }} className="justify-content-center">
        <Col>
          <h1 className="text-center">Shopping cart</h1>
        </Col>
      </Row>
      <Row className="align-items-start">
        {cartItems.length > 0 ? (
          <Col className="">
            <Stack gap={5} className="me-auto">
              <CartProducts />
            </Stack>
          </Col>
        ) : (
          <Col className="">
            <h3 className="" style={{ marginLeft: '540px' }}>
              Cart is empty
            </h3>
          </Col>
        )}
        <Col className="bg-light" lg={{ span: 2 }}>
          <Stack className="p-4" gap={3}>
            <h5 className="text-center">Total: {cartTotalPrice}€</h5>
            <Button
              onClick={() => {
                navigate('/checkout');
              }}
              className="custom-button fs-5"
            >
              Checkout
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
