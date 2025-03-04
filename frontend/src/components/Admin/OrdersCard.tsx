import ordersService from '#src/services/orders';

import { useToast } from '#src/context/ToastContext';
import useAuth from '#src/hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import DeleteModal from './DeleteModal';

import { OrderFromBackend } from '#src/types/types.ts';

const OrdersCard = ({ orders }: { orders: OrderFromBackend[] | undefined }) => {
  const { changeToast } = useToast();
  const { loggedOnUser, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteMutation = useMutation({
    // Delete order from backend
    mutationFn: async (id: string) => {
      try {
        return await ordersService.deleteOne(id, loggedOnUser?.accessToken);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'jwt expired' && loggedOnUser) {
            // Refresh expired access token and retry deleting order
            const { newAccessToken } =
              await refreshAccessToken.mutateAsync(loggedOnUser);
            return await ordersService.deleteOne(id, newAccessToken);
          } else {
            throw error;
          }
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['orders']
      });
      changeToast({ message: 'Order deleted', show: true });
    },
    onError: (error) => changeToast({ message: error.message, show: true })
  });

  const handleDelete = (id: string) => {
    setShowModal(false);
    deleteMutation.mutate(id);
  };

  return (
    <Card>
      <Card.Header>Orders in database</Card.Header>
      <Card.Body>
        <Accordion>
          {orders?.map((order) => (
            <div key={order.id}>
              <DeleteModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                id={order.id}
              />

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
                          <Accordion.Item
                            key={product.id}
                            eventKey={product.id}
                          >
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
                    onClick={() => setShowModal(true)}
                    className="d-flex gap-2"
                  >
                    <div>Delete</div>
                    <i className="bi bi-trash3"></i>
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default OrdersCard;
