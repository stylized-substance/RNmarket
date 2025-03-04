import productsService from '#src/services/products';

import { useToast } from '#src/context/ToastContext';
import useAuth from '#src/hooks/useAuth.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import DeleteModal from './DeleteModal';

import { Product } from '#src/types/types.ts';

const ProductsCard = ({
  products
}: {
  products: Product[] | undefined;
}) => {
  const { changeToast } = useToast();
  const { loggedOnUser, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteMutation = useMutation({
    // Delete product from backend
    mutationFn: async (id: string) => {
      try {
        return await productsService.deleteOne(id, loggedOnUser?.accessToken);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'jwt expired' && loggedOnUser) {
            // Refresh expired access token and retry deleting product
            const { newAccessToken } =
              await refreshAccessToken.mutateAsync(loggedOnUser);
            return await productsService.deleteOne(id, newAccessToken);
          } else {
            throw error;
          }
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products']
      });
      changeToast({ message: 'Product deleted', show: true });
    },
    onError: (error) => changeToast({ message: error.message, show: true })
  });

  const handleDelete = (id: string) => {
    setShowModal(false);
    deleteMutation.mutate(id);
  };

  return (
    <Card>
      <Card.Header>Products in database</Card.Header>
      <Card.Body>
        <Accordion>
          {products?.map((product) => (
            <div key={product.id}>
              <DeleteModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                id={product.id}
              />
              <Accordion.Item key={product.id} eventKey={product.id}>
                <Accordion.Header>{product.title}</Accordion.Header>
                <Accordion.Body>
                  <dl>
                    <dt>Id</dt>
                    <dd>{product.id}</dd>
                    <dt>Category</dt>
                    <dd>{product.category}</dd>
                    <dt>Price</dt>
                    <dd>{product.price}</dd>
                    <dt>Amount of product in stock</dt>
                    <dd>{product.instock}</dd>
                    <dt>Created at</dt>
                    <dd>{product.createdAt}</dd>
                    <dt>Updated at</dt>
                    <dd>{product.updatedAt}</dd>
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

export default ProductsCard;
