import supertest from 'supertest';
import app from '#src/app';
import {
  connectToDatabase,
  closeDatabaseConnection,
  dropAllTables
} from '#src/utils/database';
import {
  assert200GetResponse,
  assert403GetResponse,
  assertValidUser,
  getToken
} from '#src/utils/testHelpers';
import { User as UserModel } from '#src/models'

const api = supertest(app);

// Declare variables for access tokens
let userAccessToken: string;
let adminAccessToken: string;

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();

  // Define regular and admin users and get access tokens for them
  const user = {
    username: 'test_user@example.org',
    password: 'password'
  };
  const adminUser = {
    username: 'admin@example.org',
    password: 'password'
  };

  // Assign access tokens to global variables
  userAccessToken = await getToken(user);
  adminAccessToken = await getToken(adminUser);
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('GET requests', () => {
  test('GET - Admin user can get all users in database', async () => {
    const response = await api
      .get('/api/users')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    assert200GetResponse(response);
    expect(response.body).toHaveProperty('users');
    response.body.users.forEach((user: unknown) => {
      assertValidUser(user);
    });
  });
});
describe('POST requests', () => {
  test('POST - Regular user can be added to database without access token in request', async () => {
    const user = {
      username: 'test_username@example.org',
      name: 'test_name',
      password: 'test_password',
      isadmin: false
    };

    const response = await api.post('/api/users').send(user);

    assert200GetResponse(response);
    expect(response.body).toHaveProperty('addedUser');
    assertValidUser(response.body.addedUser);
  });
  test('POST - Regular user cannot add an admin user', async () => {
    const user = {
      username: 'test_username@example.org',
      name: 'test_name',
      password: 'test_password',
      isadmin: true
    };
    
    const response = await api
    .post('/api/users')
    .send(user)
    .set('Authorization', `Bearer ${userAccessToken}`);

    assert403GetResponse(response);
    expect(response.body).toStrictEqual({
      Error: 'Only admin users can create admin users'
    })
  })
});
describe('PUT requests', () => {
  test('PUT - User can change their own password', async () => {
    // Find test user in database
    const userInDb: UserModel | null = await UserModel.findOne({
      where: {
        username: 'test_user@example.org'    
      }
    })

    const response = await api
      .put(`/api/users/${userInDb?.toJSON().id}`)
      .send({ password: 'newpassword'})
      .set('Authorization', `Bearer ${userAccessToken}`)

    assert200GetResponse(response);
    expect(response.body).toHaveProperty('saveResult');
    assertValidUser(response.body.saveResult);
  })
})
