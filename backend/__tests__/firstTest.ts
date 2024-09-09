// import { beforeEach } from 'node:test';
import supertest from 'supertest';
import app from '#src/app';
import { connectToDatabase, dropAllTables } from '#src/utils/database';

const api = supertest(app);

console.log('node_env', process.env.NODE_ENV)

beforeAll(async () => {
  await dropAllTables();
  await connectToDatabase();
});

test('GET /api/products', async () => {
  const response = await api.get('/api/products');
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/application\/json/)
});
