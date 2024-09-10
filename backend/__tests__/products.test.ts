// import { beforeEach } from 'node:test';
import supertest from 'supertest';
import app from '#src/app';
import { connectToDatabase, closeDatabaseConnection, dropAllTables } from '#src/utils/database';

const api = supertest(app);

beforeEach(async () => {
  await dropAllTables();
  await connectToDatabase();
});

describe('GET requests', () => {
  test('/api/products returns all products from database', async () => {
    const response = await api.get('/api/products');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.body.products.length).toEqual(50)
  });
})

afterAll(async () => {
  await closeDatabaseConnection();
})
