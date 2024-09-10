import supertest from 'supertest';
import app from '#src/app';
import { connectToDatabase, closeDatabaseConnection, dropAllTables } from '#src/utils/database';
import Response from 'superagent/lib/node/response'

const api = supertest(app);

beforeEach(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

describe('GET requests', () => {
  // Custom assert function to reduce boilerplate
  const assertGetResponse = (response: Response) => {
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/)
  }
  
  test('GET /api/products returns all products from database', async () => {
    const response = await api.get('/api/products');
    assertGetResponse(response);
    expect(response.body.products.length).toEqual(50)
  });

  describe('With query parameters', () => {
    test('limit=1 returns one product', async () => {
      const response = await api.get('/api/products').query('limit=1');
      assertGetResponse(response);
      expect(response.body.products.length).toEqual(1)
    })
  })
})

afterAll(async () => {
  await closeDatabaseConnection();
})
