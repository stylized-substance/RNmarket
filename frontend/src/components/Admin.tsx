import useAuth from '#src/hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '#src/context/ToastContext';
import { useEffect } from 'react';

import ordersService from '#src/services/orders';
import { LoginPayload } from '#src/types/types.ts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Admin = ({ loggedOnUser }: { loggedOnUser: LoginPayload | null }) => {
  const { refreshAccessToken } = useAuth();
  const { changeToast } = useToast();

  const refreshTokenAndRetry = async (user: LoginPayload) => {
    try {
      const refreshResult = await refreshAccessToken.mutateAsync(user);
      return await ordersService.getAll(refreshResult.loggedOnUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        changeToast({
          message: `Error while getting orders: ${error.message}`,
          show: true
        });
      }
    }
  };

  // Fetch orders with Tanstack Query
  const orders = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!loggedOnUser?.isadmin) {
        throw new Error('Admin not logged in');
      }

      try {
        return await ordersService.getAll(loggedOnUser);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'jwt expired') {
            const refreshResult = await refreshTokenAndRetry(loggedOnUser);
            console.log('refreshresult', refreshResult);
          } else {
            throw new Error(error.message);
          }
        }
      }
    }
  });

  console.log(orders);

  useEffect(() => {
    if (orders.error) {
      changeToast({
        message: orders.error.message,
        show: true
      });
    }
  }, []);

  // useEffect(() => {
  //   const getNewToken = async () => {
  //     if (loggedOnUser) {
  //       await refreshAccessToken.mutateAsync(loggedOnUser);
  //     }
  //   };

  //   if (
  //     orders.error &&
  //     orders.error instanceof Error &&
  //     orders.error.message === 'jwt expired' &&
  //     loggedOnUser
  //   ) {
  //     try {
  //       const token = getNewToken();
  //       console.log('token', token)
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         changeToast({
  //           message: error.message,
  //           show: true
  //         });
  //       }
  //     }
  //   }
  // });

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
