import { UserFromBackend } from '#src/types/types.ts';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const UsersCard = ({ users }: { users: UserFromBackend[] | undefined }) => {
  console.log(users)
  return (
    <Card>
      <Card.Header>Users in database</Card.Header>
      <Card.Body>
        <Accordion>
          {users?.map((user) => (
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
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default UsersCard;
