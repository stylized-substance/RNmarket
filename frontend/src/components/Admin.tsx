import { useQuery } from '@tanstack/react-query';
import useAuth from '#src/hooks/useAuth.ts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ordersService from '#src/services/orders';

const Admin = () => {
  const { loggedOnUser } = useAuth();

  //TODO: fix loggedOnUser not being defined on first render
  // Fetch orders with Tanstack Query
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!loggedOnUser) {
        console.error("No user logged in")
        return null;
      }

      return await ordersService.getAll(loggedOnUser);
    }
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
        {orders?.map(order => <div key={order.id}>{order.id}</div>)}
      </Row>
    </>
  );
};

export default Admin;
