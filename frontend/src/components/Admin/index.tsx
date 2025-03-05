import useAuth from '#src/hooks/useAuth.ts';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useToast } from '#src/context/ToastContext';

import productsService from '#src/services/products';
import usersService from '#src/services/users';
import ordersService from '#src/services/orders';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrdersCard from '#src/components/Admin/OrdersCard';
import ProductsCard from '#src/components/Admin/ProductsCard';
import UsersCard from '#src/components/Admin/UsersCard';
import DeleteModal from './DeleteModal';

import { ItemToDelete } from '#src/types/types'

const Admin = () => {
  const { changeToast } = useToast();
  const { loggedOnUser, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [itemToDelete, setItemtoDelete] = useState<ItemToDelete | null>(null);

  // TODO: Consolidate queries to a single function

  // Fetch products, users and orders with Tanstack Query
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log('fetching products');
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
            throw error;
          }
        }
      }
    },
    enabled: loggedOnUser?.isadmin // Don't run query if admin user isn't logged in
  });

  const deleteMutation = useMutation({
    // Delete item from backend
    mutationFn: async ({ type, id }: ItemToDelete) => {
      let deleteFunction;

      try {
        switch (type) {
          case 'products':
            deleteFunction = productsService.deleteOne;
            return await productsService.deleteOne(
              id,
              loggedOnUser?.accessToken
            );
          case 'users':
            deleteFunction = usersService.deleteOne;
            return await usersService.deleteOne(id, loggedOnUser?.accessToken);
          case 'orders':
            deleteFunction = ordersService.deleteOne;
            return await ordersService.deleteOne(id, loggedOnUser?.accessToken);
          default: {
            const _exhaustiveCheck: never = type;
            return _exhaustiveCheck;
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (
            error.message === 'jwt expired' &&
            loggedOnUser &&
            deleteFunction
          ) {
            // Refresh expired access token and retry deleting product
            const { newAccessToken } =
              await refreshAccessToken.mutateAsync(loggedOnUser);
            return await deleteFunction(id, newAccessToken);
          } else {
            throw error;
          }
        }
      }
    },
    onSuccess: async (result, { type }) => {
      console.log(result);
      console.log(`invalidating ${type}`);
      await queryClient.invalidateQueries({
        queryKey: [`${type}`]
      });
      changeToast({ message: `${type} deleted`, show: true });
    },
    onError: (error) => changeToast({ message: error.message, show: true })
  });

  const prepareForDelete = (item: ItemToDelete) => {
    setItemtoDelete(item);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    console.log('itemToDelete', itemToDelete);

    if (itemToDelete) {
      setShowDeleteModal(false);
      deleteMutation.mutate(itemToDelete);
    }
  };

  if (!loggedOnUser?.isadmin) {
    return <h1 className="text-center mt-5">Admin not logged in</h1>;
  }

  return (
    <>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
      />
      <h1 className="text-center m-4">Admin page</h1>
      <Row className="mt-4">
        <Col lg={4}>
          <ProductsCard
            products={products}
            prepareForDelete={prepareForDelete}
          />
        </Col>
        <Col lg={4}>
          <UsersCard users={users} prepareForDelete={prepareForDelete} />
        </Col>
        <Col lg={4}>
          <OrdersCard orders={orders} prepareForDelete={prepareForDelete} />
        </Col>
      </Row>
    </>
  );
};

export default Admin;
