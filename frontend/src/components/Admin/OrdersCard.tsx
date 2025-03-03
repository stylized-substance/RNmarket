import { OrderFromBackend } from '#src/types/types.ts';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const OrdersCard = ({ orders }: { orders: OrderFromBackend[] | undefined }) => {
  return (
    <Card>
      <Card.Header>Orders in database</Card.Header>
      <Card.Body>
        <Accordion>
          {orders?.map((order) => (
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
                    <>
                      <Accordion className="mt-2">
                        <Accordion.Item key={product.id} eventKey={product.id}>
                          <Accordion.Header>{product.title}</Accordion.Header>
                          <Accordion.Body>
                            <dl>
                              <dt>Id:</dt>
                              {product.id}
                              <dt>Price:</dt>
                              {product.price}
                              <dt>Amount of product in stock: </dt>
                              {product.instock}
                              <dt>Product quantity in order: </dt>
                              {product.quantity}
                            </dl>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </>
                  ))}
                </dl>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default OrdersCard;
