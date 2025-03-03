import useAuth from '#src/hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';

import productsService from '#src/services/products';
import usersService from '#src/services/users';
import ordersService from '#src/services/orders';

import { LoginPayload } from '#src/types/types.ts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrdersCard from '#src/components/Admin/OrdersCard';
import ProductsCard from '#src/components/Admin/ProductsCard';
import UsersCard from '#src/components/Admin/UsersCard';

const Admin = ({ loggedOnUser }: { loggedOnUser: LoginPayload | null }) => {
  const { refreshAccessToken } = useAuth();

  // Fetch products, users and orders with Tanstack Query
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      return await productsService.getAll({});
    }
  });

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
            const refreshResult =
              await refreshAccessToken.mutateAsync(loggedOnUser);
            return await usersService.getAll(refreshResult?.loggedOnUser);
          } else {
            throw new Error(error.message);
          }
        }
      }
    },
    enabled: loggedOnUser?.isadmin // Don't run query if admin user isn't logged in
  });

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
            const refreshResult =
              await refreshAccessToken.mutateAsync(loggedOnUser);
            return await ordersService.getAll(refreshResult?.loggedOnUser);
          } else {
            throw new Error(error.message);
          }
        }
      }
    },
    enabled: loggedOnUser?.isadmin // Don't run query if admin user isn't logged in
  });

  if (!loggedOnUser?.isadmin) {
    return <h1 className="text-center mt-5">Admin not logged in</h1>;
  }

  return (
    <>
      <h1 className="text-center m-4">Admin page</h1>
      <Row className="mt-4">
        <Col lg={4}>
          <ProductsCard products={products} />
        </Col>
        <Col lg={4}>
          <UsersCard users={users} />
        </Col>
        <Col lg={4}>
          <OrdersCard orders={orders} />
        </Col>
      </Row>
    </>
  );
};

export default Admin;
