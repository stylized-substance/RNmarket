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
      cart.dispatch({
        type: 'added',
        payload: { product: products[0], quantity: 1 }
      });
    }
  }, [products]);

  if (isPending || isError) {
    return null;
  }

  const cartIds: string[] = cart.state.map((item) => item.product.id);

  const cartProducts: Product[] = products.filter((product) =>
    cartIds.includes(product.id)
  );

  console.log('cartProducts', cartProducts);
  console.log('cartItems', cartItems);

  return (
    <Container>
      <Row className="text-center">
        <h2>Cart</h2>
      </Row>
      <Row>
        {cartProducts.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </Row>
    </Container>
  );
};

export default Cart;
