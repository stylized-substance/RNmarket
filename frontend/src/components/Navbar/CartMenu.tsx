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
    <Col
      style={{
        height: '50vh',
        width: '40vh',
        scrollbarWidth: 'thin'
      }}
      className="d-flex flex-column overflow-x-hidden overflow-y-scroll"
    >
      <Row
        id="button-row"
        className="justify-content-center align-items-center border-bottom"
      >
        <Button
          onClick={() => navigate('/cart')}
          className="custom-button mb-2 w-25"
        >
          Go to cart
        </Button>
      </Row>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Row
            key={item.product.id}
            className="p-4 border-bottom align-items-start"
          >
            <Col id="cart-product-image" className="d-flex flex-column">
              {item.product.imgs && (
                <Image
                  src={item.product.imgs[0]}
                  style={{ height: 100, width: 100, objectFit: 'contain' }}
                  className="align-self-start"
                />
              )}
            </Col>
            <Col id="title-column">
              <Row className="">
                <Link
                  to={`/products/${item.product.id}`}
                  className="d-flex text-light"
                >
                  <div>{item.product.title.substring(0, 40)}...</div>
                </Link>
              </Row>
              <Row>
                <div className="text-danger">{item.product.price}€</div>
              </Row>
            </Col>
            <Col>
              <Stack direction="horizontal" gap={2}>
                <Button
                  style={{ background: 'black' }}
                  onClick={() => handleDecrease(item)}
                  disabled={item.product.instock === 0}
                  className="border justify-content-center"
                >
                  -
                </Button>
                <Badge
                  bg="light"
                  text="dark"
                  style={{ width: 40 }}
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
