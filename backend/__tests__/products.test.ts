import supertest from 'supertest';
import app from '#src/app';
import {
  connectToDatabase,
  closeDatabaseConnection,
  dropAllTables
} from '#src/utils/database';
import {
  assert200GetResponse,
  assert400GetResponse,
  assertValidProduct,
  assertValidReview
} from '#src/utils/testHelpers';
import { ProductCategory, Product } from '#src/types/types';

const api = supertest(app);

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

describe('GET requests', () => {
  test('GET /api/products returns all products from database', async () => {
    const response = await api.get('/api/products');
    assert200GetResponse(response);
    expect(response.body).toHaveProperty('products');
    expect(response.body.products).toHaveLength(50);
    response.body.products.forEach((product: unknown) =>
      assertValidProduct(product)
    );
  });

  describe('With query parameters', () => {
    test('limit=1 returns one product', async () => {
      const response = await api.get('/api/products').query('limit=1');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toHaveLength(1);
      response.body.products.forEach((product: unknown) =>
        assertValidProduct(product)
      );
    });

    test('request fails if value of limit is not a number', async () => {
      const response = await api.get('/api/products').query('limit=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid product query limit'
      });
    });

    test('withReviews=true returns reviews with products', async () => {
      const response = await api.get('/api/products').query('withReviews=true');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      for (const product of response.body.products) {
        assertValidProduct(product);
        expect(product).toHaveProperty('Reviews');
        product.Reviews.forEach((review: unknown) => assertValidReview(review));
      }
    });

    test(`request fails if value of withReviews is not 'true'`, async () => {
      const response = await api.get('/api/products').query('withReviews=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: `Value for 'withReviews' must be 'true' if used`
      });
    });

    test('all valid product categories return corresponding products', async () => {
      for (const category of Object.keys(ProductCategory)) {
        const response = await api
          .get('/api/products')
          .query(`category=${category}`);
        assert200GetResponse(response);
        expect(response.body).toHaveProperty('products');
        for (const product of response.body.products) {
          assertValidProduct(product);
          expect(product.category).toBe(category);
        }
      }
    });

    test('request fails when querying with invalid product category', async () => {
      const response = await api.get('/api/products').query('category=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        'Error name': 'TypeNarrowingError',
        'Error message': 'Invalid product category'
      });
    });

    test('search returns relevant products', async () => {
      const response = await api.get('/api/products').query('search=Apple');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products.length).toBeGreaterThan(0);
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.title).toMatch(/Apple/);
      });
    });

    test('request fails if search query is longer than 15 characters', async () => {
      const response = await api
        .get('/api/products')
        .query('search=searchquerylongerthanfifteen');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid search query'
      });
    });

    test('querying with a valid price range returns relevant products', async () => {
      const lowestPrice = 10;
      const highestPrice = 50000;

      const response = await api
        .get('/api/products')
        .query(`lowestPrice=${lowestPrice}&highestPrice=${highestPrice}`);
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.price >= lowestPrice && product.price <= highestPrice);
      });
    });

    test('request fails with an invalid price range', async () => {
      let lowestPrice = 10;
      let highestPrice = 10000000;

      let response = await api
        .get('/api/products')
        .query(`lowestPrice=${lowestPrice}&highestPrice=${highestPrice}`);
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid highest price query'
      });

      lowestPrice = -1;
      highestPrice = 50000;

      response = await api
        .get('/api/products')
        .query(`lowestPrice=${lowestPrice}&highestPrice=${highestPrice}`);
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid lowest price query'
      });
    });

    test('request fails if lowestPrice or highestPrice is omitted', async () => {
      let response = await api.get('/api/products').query('lowestPrice=10');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Highest value in price range query missing'
      });
      response = await api.get('/api/products').query('highestPrice=10');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Lowest value in price range query missing'
      });
    });

    test('inStock=true returns products that are in stock', async () => {
      const response = await api.get('/api/products').query('inStock=true');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.instock).toBeGreaterThan(0);
      });
    });

    test('request fails if value of inStock is not true', async () => {
      const response = await api.get('/api/products').query('inStock=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: `Value for 'inStock' must be 'true' if used`
      });
    });
  });
});

afterAll(async () => {
  await closeDatabaseConnection();
});
