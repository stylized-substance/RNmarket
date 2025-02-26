import useAuth from '#src/hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';

import ordersService from '#src/services/orders';
import productsService from '#src/services/products';

import { LoginPayload, OrderFromBackend, OrderWithProducts, Product } from '#src/types/types.ts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

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
        // Fetch orders
        const orders: OrderFromBackend[] =  await ordersService.getAll(loggedOnUser);
        return orders

        // Fetch order product data and attach to order
        // const ordersWithProducts: OrderWithProducts[] = []

        // for (const order of orders) {
          // const orderProducts = order.Products.map(async (product) => {
          //   return await productsService.getOne(product.id)
          // })
          // const resolved = await Promise.all(orderProducts)
          // console.log(resolved)

          // const orderProducts = await Promise.all(order.Products.map(async (product) => await productsService.getOne(product.id)))
          
          // const orderWithProducts: OrderWithProducts = {
          //   ...order,
          //   Products: orderProducts
          // }
          
          // ordersWithProducts.push(orderWithProducts)
        //}
        // console.log(ordersWithProducts)

        // return ordersWithProducts
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

  // const createOrderDetails = (order: OrderInDb) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { products, ...rest } = order;
  //   // console.log(Object.entries(rest))
  //   return (
  //     <dl>
  //       {Object.entries(rest).map(([key, value]) => (
  //         <React.Fragment key={order.id}>
  //           <dt>{key}</dt>
  //           <dd>{value}</dd>
  //         </React.Fragment>
  //       ))}
  //     </dl>
  //   );
  // };
  console.log(orders.data);

  

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
          <Card>
            <Card.Header>Orders in database</Card.Header>
            <Card.Body>
              <Accordion>
                {orders.data?.map((order) => (
                  <Accordion.Item key={order.id} eventKey={order.id}>
                    <Accordion.Header>{order.id}</Accordion.Header>
                    <Accordion.Body>
                      <dl>
                        <dt>Created at</dt>
                        <dd>{order.createdAt}</dd>
                        <dt>Email</dt>
                        <dd>{order.email}</dd>
                        <dt>Name</dt>
                        <dd>{order.name}</dd>
                        <dt>Address</dt>
                        <dd>{order.address}</dd>
                        <dt>Zip code</dt>
                        <dd>{order.zipcode}</dd>
                        <dt>City</dt>
                        <dd>{order.city}</dd>
                        <dt>Country</dt>
                        <dd>{order.country}</dd>
                        <dt>Products</dt>
                        {order.Products.map((product) => (
                          <div key={product.id}>
                            <div>{product.title}</div>
                            <div>{product.quantity}</div>
                          </div>
                        ))}
                      </dl>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Admin;
