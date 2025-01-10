import { useEffect } from 'react';
import { useCart } from '#src/context/CartContext.tsx';
import { useQuery } from '@tanstack/react-query';

import productsService from '#src/services/products';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import CartProducts from '#src/components/Cart/CartProducts';

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
      //     cart.dispatch({
      //       type: 'added',
      //       payload: [
      //         { product: products[0], quantity: 1 },
      //         { product: products[1], quantity: 1 }
      //       ]
      //     });
      //   }
      // }, [products]);
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
      <Row style={{ marginBottom: '100px' }}>
        <h1 className="text-center">Shopping cart</h1>
      </Row>
      <Row className="align-items-start">
        <Col className="">
          <Stack gap={5} className="me-auto">
            <CartProducts />
          </Stack>
        </Col>
        <Col className="bg-light" lg={{ span: 2 }}>
          <Stack className="p-4" gap={3}>
            <h5 className="text-center">Total: {cartTotalPrice}€</h5>
            {/* TODO: Navigate to checkout page*/}
            <Button className="custom-button fs-5">Checkout</Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
