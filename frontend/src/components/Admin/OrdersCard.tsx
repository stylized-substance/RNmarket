import { OrderFromBackend } from '#src/types/types.ts';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

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
                  <dt>Created at</dt>
                  <dd>{order.createdAt}</dd>
                  <dt>Updated at</dt>
                  <dd>{order.updatedAt}</dd>
                  <dt>Products</dt>
                  {order.Products.map((product) => (
                    <div key={product.id}>
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
                              <dt>Quantity of product in order: </dt>
                              {product.quantity}
                            </dl>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                </dl>
                <Button
                  style={{ background: 'firebrick' }}
                  onClick={() => handleRemove(order.id)}
                  className="d-flex gap-2"
                >
                  <div>Delete</div>
                  <i className="bi bi-trash3"></i>
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default OrdersCard;
