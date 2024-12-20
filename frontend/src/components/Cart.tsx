import { useEffect } from 'react';
import { useCart } from '#src/context/CartContext.tsx';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import productsService from '#src/services/products';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import { CartItem } from '#src/types/types';

const Cart = () => {
  const navigate = useNavigate();
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

    const handleRemove = (item: CartItem) => {
      cart.dispatch({
        type: 'removed',
        payload: item
      });
    };

    return (
      <>
        {cartItems.map((item) => (
          <Row key={item.product.id} className="gap-5">
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
                {item.product.instock > 0 ? (
                  <p>In stock: {item.product.instock}</p>
                ) : (
                  <p style={{ color: 'red' }}>Product out of stock</p>
                )}
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
                  Remove
                </Button>
              </Stack>
            </Col>
          </Row>
        ))}
      </>
    );
  };

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
