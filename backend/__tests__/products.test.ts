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
import { ProductCategory } from '#src/types/types';

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

    test('request fails if value of limit is not a number', async () => {
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

    test(`request fails if value of withReviews is not 'true'`, async () => {
      const response = await api.get('/api/products').query('withReviews=asd');
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual({
        Error: `Value for 'withReviews' must be 'true' if used`
      });
    });

    test('all valid product categories return corresponding products', async () => {
      for (const category of Object.keys(ProductCategory)) {
        const response = await api
          .get('/api/products')
          .query(`category=${category}`);
        assertGetResponse(response);
        expect(response.body.products).toBeDefined();
        for (const product of response.body.products) {
          assertValidProduct(product);
          expect(product.category).toBe(category);
        }
      }
    });

    test('request fails when querying with invalid product category', async () => {
      const response = await api.get('/api/products').query('category=asd')
      expect(response.status).toBe(400)
      expect(response.body).toStrictEqual({
        'Error name': 'TypeNarrowingError',
        'Error message': 'Invalid product category'
      })
    })
  });
});

afterAll(async () => {
  await closeDatabaseConnection();
});
