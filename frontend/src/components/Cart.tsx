import { useEffect } from 'react';
import { useCart } from '#src/context/CartContext.tsx';
import { useQuery } from '@tanstack/react-query';

import { backendAddress } from '#src/utils/config.ts';

import productsService from '#src/services/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { CartItem } from '#src/types/types';

const Cart = () => {
  // Import cart context
  const cart = useCart();
  const cartItems = cart.state;

  // Fetch products with Tanstack Query
  const {
    data: products,
    isPending,
    isError
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll()
  });

  useEffect(() => {
    if (products) {
      for (const product of products) {
        cart.dispatch({
          type: 'added',
          payload: { product: product, quantity: 1 }
        });
      }
    }
  }, [products]);

  if (isPending || isError) {
    return null;
  }

  console.log(cartItems[0]);

  const CartProducts = () => {
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

    return (
      <>
        {cartItems.map((item) => (
          <Row key={item.product.id}>
            <Col>
              {item.product.imgs && (
                <Image
                  src={item.product.imgs[0]}
                  thumbnail
                  style={{ height: 200, width: 'auto' }}
                />
              )}
            </Col>
            <Col>
              <b>{item.product.title}</b>
              <p>{item.product.price}</p>
              <p>In stock: {item.product.instock}</p>
            </Col>
            <Col>
              <Stack direction="horizontal" gap={3}>
                <Button
                  style={{ background: 'black' }}
                  onClick={() => handleDecrease(item)}
                >
                  -
                </Button>
                {item.quantity}
                <Button
                  style={{ background: 'black' }}
                  onClick={() => handleIncrease(item)}
                >
                  +
                </Button>
                <Button style={{ background: 'crimson' }}>Remove</Button>
              </Stack>
            </Col>
          </Row>
        ))}
      </>
    );
  };

  return (
    <Container>
      <Stack gap={5}>
        <Row>
          <h2 className="text-center mb-4">Shopping cart</h2>
        </Row>
        <CartProducts />
      </Stack>
    </Container>
  );
};

export default Cart;