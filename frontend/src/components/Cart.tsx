import { useEffect } from 'react';
import { useCart } from '#src/context/CartContext.tsx';
import { useQuery } from '@tanstack/react-query';

import productsService from '#src/services/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Product } from '#src/types/types.ts';

const Cart = () => {
  // Import cart context
  const cart = useCart();
  const cartItems = cart.state

  // Fetch products with Tanstack Query
  const { data: products, isPending, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll()
  });

  useEffect(() => {
    if (products) {
      cart.dispatch({
        type: 'added',
        payload: { product: products[0], quantity: 1 }
      });
    }
  }, [products]);

  if (isPending || isError) {
    return null;
  }

  // const products: Product[] = data;

  const cartProducts = products.filter((product) => cart.state.includes(product.id))

  // const cartProducts = products.map((product) => {
  //   for (const item of cart.state) {
  //     if (item.id === product.id) {
  //       return product;
  //     }
  //   }
  // });

  console.log('cartProducts', cartProducts);
  console.log('cartItems', Array.(cartItems))

  return (
    <Container>
      <Row className="text-center">
        <h2>Cart</h2>
      </Row>
      <Row>
        {/* {cartProducts.map((product) => (
          {product.name}
        ))} */}
        </Row>
    </Container>
  );
};

export default Cart;
