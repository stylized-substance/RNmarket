import useAuth from '#src/hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';

import productsService from '#src/services/products';
import usersService from '#src/services/users';
import ordersService from '#src/services/orders';

import { LoginPayload } from '#src/types/types.ts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import OrdersCard from '#src/components/Admin/OrdersCard';

const Admin = ({ loggedOnUser }: { loggedOnUser: LoginPayload | null }) => {
  const { refreshAccessToken } = useAuth();

  const refreshTokenAndRetry = async (user: LoginPayload) => {
    try {
      const refreshResult = await refreshAccessToken.mutateAsync(user);
      return await ordersService.getAll(refreshResult.loggedOnUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Error while refreshing token and getting orders: ${error.message}`
        );
      }
      return [];
    }
  };

  // Fetch products, users and orders with Tanstack Query
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await productsService.getAll({});
    }
  });

  console.log('products', products);

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (!loggedOnUser?.isadmin) {
        return;
      }

      try {
        return await usersService.getAll(loggedOnUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'jwt expired') {
            return await refreshTokenAndRetry(loggedOnUser);
          } else {
            throw new Error(error.message);
          }
        }
      }
    },
    enabled: loggedOnUser?.isadmin // Don't run query if admin user isn't logged in
  });

  console.log('users', users);

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!loggedOnUser?.isadmin) {
        return;
      }

      try {
        return await ordersService.getAll(loggedOnUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'jwt expired') {
            return await refreshTokenAndRetry(loggedOnUser);
          } else {
            throw new Error(error.message);
          }
        }
      }
    },
    enabled: loggedOnUser?.isadmin // Don't run query if admin user isn't logged in
  });

  console.log('orders', orders);

  if (!loggedOnUser?.isadmin) {
    return <h1 className="text-center mt-5">Admin not logged in</h1>;
  }

  return (
    <>
      <h1 className="text-center m-4">Admin page</h1>
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Header>Products in database</Card.Header>
            <Card.Body>
              <ListGroup></ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>Users in database</Card.Header>
            <Card.Body>
              <ListGroup></ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <OrdersCard orders={orders} />
        </Col>
      </Row>
    </>
  );
};

export default Admin;
