import { useCart } from '#src/context/CartContext.tsx';

import { Link } from 'react-router-dom';
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
    <>
      {cartItems.map((item) => (
        <Row key={item.product.id} className="p-4 ">
          <Col id="cart-product-image" className="flex-shrink-0">
            {item.product.imgs && (
              <Image
                src={item.product.imgs[0]}
                thumbnail
                style={{ height: 200, width: 200 }}
                className="object-fit-scale"
              />
            )}
          </Col>
          <Col>
            <Stack gap={2}>
              <Link to={`/products/${item.product.id}`}>
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
              >
                -
              </Button>
              <Badge
                bg="light"
                text="dark"
                className="fs-6"
                style={{ width: '40px' }}
              >
                {item.quantity}
              </Badge>
              <Button
                style={{ background: 'black' }}
                onClick={() => handleIncrease(item)}
                disabled={item.product.instock === 0}
              >
                +
              </Button>
              <Button
                style={{ background: 'firebrick' }}
                onClick={() => handleRemove(item)}
              >
                <i className="bi bi-trash3"></i>
              </Button>
            </Stack>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default CartMenu;
