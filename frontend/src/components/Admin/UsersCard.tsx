import usersService from '#src/services/users.ts';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '#src/context/ToastContext.tsx';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import DeleteModal from './DeleteModal';

import { UserFromBackend } from '#src/types/types.ts';
import useAuth from '#src/hooks/useAuth.ts';

const UsersCard = ({ users }: { users: UserFromBackend[] | undefined }) => {
  console.log(users)
  const { changeToast } = useToast();
  const { loggedOnUser, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState<boolean>(false);

  // TODO: fix users being deleted in reverse order

  const deleteMutation = useMutation({
    // Delete user from backend
    mutationFn: async (id: string) => {
      try {
        return await usersService.deleteOne(id, loggedOnUser?.accessToken);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'jwt expired' && loggedOnUser) {
            // Refresh expired access token and retry deleting user
            const { newAccessToken } =
              await refreshAccessToken.mutateAsync(loggedOnUser);
            return await usersService.deleteOne(id, newAccessToken);
          } else {
            throw error;
          }
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users']
      });
      changeToast({ message: 'User deleted', show: true });
    },
    onError: (error) => changeToast({ message: error.message, show: true })
  });

  const handleDelete = (id: string) => {
    setShowModal(false);
    deleteMutation.mutate(id);
  };

  return (
    <Card>
      <Card.Header>Users in database</Card.Header>
      <Card.Body>
        <Accordion>
          {users?.map((user) => (
            <div key={user.id}>
              <DeleteModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleDelete={handleDelete}
                id={user.id}
              />
              <Accordion.Item key={user.id} eventKey={user.id}>
                <Accordion.Header>{user.username}</Accordion.Header>
                <Accordion.Body>
                  <dl>
                    <dt>Id</dt>
                    <dd>{user.id}</dd>
                    <dt>Name</dt>
                    <dd>{user.name}</dd>
                    <dt>Admin user</dt>
                    <dd>{user.isadmin ? 'Yes' : 'No'}</dd>
                    <dt>Created at</dt>
                    <dd>{user.createdAt}</dd>
                    <dt>Updated at</dt>
                    <dd>{user.updatedAt}</dd>
                  </dl>
                  <Button
                    style={{ background: 'firebrick' }}
                    onClick={() => {console.log('card_id', user); setShowModal(true)}}
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

export default UsersCard;
