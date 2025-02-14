import useAuth from '#src/hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';

import ordersService from '#src/services/orders';
import { LoginPayload } from '#src/types/types.ts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  // Fetch orders with Tanstack Query
  const orders = useQuery({
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
    enabled: !!loggedOnUser?.isadmin // Don't run query if admin user isn't logged in
  });

  if (!loggedOnUser?.isadmin) {
    return <h1 className="text-center mt-5">Admin not logged in</h1>;
  }

  return (
    <>
      <h1 className="text-center m-4">Admin page</h1>
      <Row>
        <Col>Products in database</Col>
        <Col>Users in database</Col>
        <Col>Orders in database</Col>
        {orders.data?.map((order) => <div key={order.id}>{order.id}</div>)}
      </Row>
    </>
  );
};

export default Admin;
