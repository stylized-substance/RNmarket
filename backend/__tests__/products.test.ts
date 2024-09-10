import supertest from 'supertest';
import app from '#src/app';
import {
  connectToDatabase,
  closeDatabaseConnection,
  dropAllTables
} from '#src/utils/database';
import {
  assertGetResponse,
  assertValidProduct,
  assertValidReview
} from '#src/utils/testHelpers';

const api = supertest(app);

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

describe('GET requests', () => {
  test('GET /api/products returns all products from database', async () => {
    const response = await api.get('/api/products');
    assertGetResponse(response);
    expect(response.body.products).toBeDefined();
    expect(response.body.products).toHaveLength(50);
    response.body.products.forEach((product: unknown) =>
      assertValidProduct(product)
    );
  });

  describe('With query parameters', () => {
    test('limit=1 returns one product', async () => {
      const response = await api.get('/api/products').query('limit=1');
      assertGetResponse(response);
      expect(response.body.products).toBeDefined();
      expect(response.body.products).toHaveLength(1);
      response.body.products.forEach((product: unknown) =>
        assertValidProduct(product)
      );
    });

    test('limit fails if value is not a number', async () => {
      const response = await api.get('/api/products').query('limit=asd');
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        Error: 'Invalid product query limit'
      });
    });

    test('withReviews=true returns reviews with products', async () => {
      const response = await api.get('/api/products').query('withReviews=true');
      assertGetResponse(response);
      expect(response.body.products).toBeDefined();
      for (const product of response.body.products) {
        assertValidProduct(product);
        expect(product.Reviews).toBeDefined();
        product.Reviews.forEach((review: unknown) => assertValidReview(review));
      }
    });
  });
});

afterAll(async () => {
  await closeDatabaseConnection();
});
