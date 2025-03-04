import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import { UserFromBackend } from '#src/types/types.ts';

interface itemToDelete {
  type: 'product' | 'user' | 'order';
  id: string;
}

const UsersCard = ({
  users,
  prepareForDelete
}: {
  users: UserFromBackend[] | undefined;
  prepareForDelete: (item: itemToDelete) => void;
}) => {
  // TODO: fix users being deleted in reverse order

  // const deleteMutation = useMutation({
  //   // Delete user from backend
  //   mutationFn: async (id: string) => {
  //     try {
  //       return await usersService.deleteOne(id, loggedOnUser?.accessToken);
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         if (error.message === 'jwt expired' && loggedOnUser) {
  //           // Refresh expired access token and retry deleting user
  //           const { newAccessToken } =
  //             await refreshAccessToken.mutateAsync(loggedOnUser);
  //           return await usersService.deleteOne(id, newAccessToken);
  //         } else {
  //           throw error;
  //         }
  //       }
  //     }
  //   },
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['users']
  //     });
  //     changeToast({ message: 'User deleted', show: true });
  //   },
  //   onError: (error) => changeToast({ message: error.message, show: true })
  // });

  return (
    <Card>
      <Card.Header>Users in database</Card.Header>
      <Card.Body>
        <Accordion>
          {users?.map((user) => (
            <div key={user.id}>
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
                    onClick={() =>
                      prepareForDelete({ type: 'user', id: user.id })
                    }
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
