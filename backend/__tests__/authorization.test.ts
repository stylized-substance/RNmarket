import supertest from 'supertest';
import app from '#src/app';
import {
  connectToDatabase,
  closeDatabaseConnection,
  dropAllTables
} from '#src/utils/database';
import { assert200GetResponse, assertValidLoginPayload } from '#src/utils/testHelpers';
// import assertValidLoginPayload from '#src/utils/testHelpers';

const api = supertest(app);

// Define test user
const user = {
  username: 'test_user@example.org',
  password: 'password'
};

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('POST requests', () => {
  test('POST - Login works with username and password', async () => {
    const response = await api.post('/api/authorization/login').send(user);

    assert200GetResponse(response)
    assertValidLoginPayload(response.body.payload)
  });
});
