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
  assertValidReview,
  getToken
} from '#src/utils/testHelpers';
import { ProductCategory, Product } from '#src/types/types';
import { Product as ProductModel, Review } from '#src/models';

const api = supertest(app);

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

// Test users for tests that perform a login to authorization  endpoint
const adminUser = {
  username: 'admin@example.org',
  password: 'password'
};

const user = {
  username: 'test_user@example.org',
  password: 'password'
};

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

  test('GET /api/products/:id returns single product', async () => {
    const productToTestWith: ProductModel | null = await ProductModel.findOne(
      {}
    );
    const id = productToTestWith?.dataValues.id;

    const response = await api.get(`/api/products/${id}`);
    assert200GetResponse(response);
    expect(response.body).toHaveProperty('product');
    assertValidProduct(response.body.product);
  });

  describe('With query parameters', () => {
    test('GET /api/products with query limit=1 returns one product', async () => {
      const response = await api.get('/api/products').query('limit=1');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products).toHaveLength(1);
      response.body.products.forEach((product: unknown) =>
        assertValidProduct(product)
      );
    });

    test('GET /api/products fails if value of limit is not a number', async () => {
      const response = await api.get('/api/products').query('limit=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid product query limit'
      });
    });

    test('GET /api/products with query withReviews=true returns reviews with products', async () => {
      const response = await api.get('/api/products').query('withReviews=true');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      for (const product of response.body.products) {
        assertValidProduct(product);
        expect(product).toHaveProperty('Reviews');
        product.Reviews.forEach((review: unknown) => assertValidReview(review));
      }
    });

    test(`GET /api/products fails if value of withReviews is not 'true'`, async () => {
      const response = await api.get('/api/products').query('withReviews=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: `Value for 'withReviews' must be 'true' if used`
      });
    });

    test('GET /api/products - All valid product categories return corresponding products', async () => {
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

    test('GET /api/products fails when querying with invalid product category', async () => {
      const response = await api.get('/api/products').query('category=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        'Error name': 'TypeNarrowingError',
        'Error message': 'Invalid product category'
      });
    });

    test('GET /api/products - Search returns relevant products', async () => {
      const response = await api.get('/api/products').query('search=Apple');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      expect(response.body.products.length).toBeGreaterThan(0);
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.title).toMatch(/Apple/);
      });
    });

    test('GET /api/products fails if search query is longer than 15 characters', async () => {
      const response = await api
        .get('/api/products')
        .query('search=searchquerylongerthanfifteen');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid search query'
      });
    });

    test('GET /api/products - Querying with a valid price range returns relevant products', async () => {
      const lowestPrice = 10;
      const highestPrice = 50000;

      const response = await api
        .get('/api/products')
        .query(`lowestPrice=${lowestPrice}&highestPrice=${highestPrice}`);
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.price).toBeGreaterThanOrEqual(lowestPrice);
        expect(product.price).toBeLessThanOrEqual(highestPrice);
      });
    });

    test('GET /api/products fails with an invalid price range', async () => {
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

    test('GET /api/products fails if lowestPrice or highestPrice is omitted', async () => {
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

    test('GET /api/products with query inStock=true returns products that are in stock', async () => {
      const response = await api.get('/api/products').query('inStock=true');
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.instock).toBeGreaterThan(0);
      });
    });

    test('GET /api/products fails if value of inStock is not true', async () => {
      const response = await api.get('/api/products').query('inStock=asd');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: `Value for 'inStock' must be 'true' if used`
      });
    });

    test('GET /api/products - Querying with a valid rating range returns relevant products', async () => {
      const lowestRating = 1;
      const highestRating = 5;

      const response = await api
        .get('/api/products')
        .query(`lowestRating=${lowestRating}&highestRating=${highestRating}`);
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('products');
      response.body.products.forEach((product: Product) => {
        assertValidProduct(product);
        expect(product.rating).toBeGreaterThanOrEqual(1);
        expect(product.rating).toBeLessThanOrEqual(5);
      });
    });

    test('GET /api/products fails if lowestRating or highestRating is omitted', async () => {
      let response = await api.get('/api/products').query('lowestRating=1');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Highest value in rating range query missing'
      });

      response = await api.get('/api/products').query('highestRating=5');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Lowest value in rating range query missing'
      });
    });

    test('GET /api/products fails with invalid rating range', async () => {
      let response = await api
        .get('/api/products')
        .query('lowestRating=-1&highestRating=5');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid lowest rating query'
      });

      response = await api
        .get('/api/products')
        .query('lowestRating=1&highestRating=6');
      assert400GetResponse(response);
      expect(response.body).toStrictEqual({
        Error: 'Invalid highest rating query'
      });
    });
  });
});

describe('POST requests', () => {
  describe('Adding products', () => {
    const productToAdd = {
      title: 'test_title',
      category: 'Mobiles',
      price: 10,
      specs: ['test_specs'],
      brand: 'test_brand',
      ram: '8GB'
    };

    test('Logged in admin user can add products', async () => {
      const accessToken = await getToken(adminUser);

      const productAddResponse = await api
        .post('/api/products')
        .send(productToAdd)
        .set('Authorization', `Bearer ${accessToken}`);

      assert200GetResponse(productAddResponse);
      expect(productAddResponse.body).toHaveProperty('addedProduct');
      assertValidProduct(productAddResponse.body.addedProduct);
    });

    test('Non-admin user cannot add products', async () => {
      const accessToken = await getToken(user);

      const productAddResponse = await api
        .post('/api/products')
        .send(productToAdd)
        .set('Authorization', `Bearer ${accessToken}`);

      assert400GetResponse(productAddResponse);
      expect(productAddResponse.body).toStrictEqual({
        Error: 'Only admin users can add products'
      });
    });
  });

  describe('PUT requests', () => {
    test('Admin user can update products', async () => {
      const accessToken = await getToken(adminUser);
      const productToTestWith: ProductModel | null = await ProductModel.findOne(
        {}
      );
      if (productToTestWith) {
        const updatedProduct = {
          ...productToTestWith.dataValues,
          price: 1000
        };
        const id = productToTestWith?.dataValues.id;

        const updateResponse = await api
          .put(`/api/products/${id}`)
          .send(updatedProduct)
          .set('Authorization', `Bearer ${accessToken}`);
        assert200GetResponse(updateResponse);
        expect(updateResponse.body).toHaveProperty('saveResult');
        assertValidProduct(updateResponse.body.saveResult);
      }
    });

    test('Non-admin user cannot update products', async () => {
      const accessToken = await getToken(user);
      const productToTestWith: ProductModel | null = await ProductModel.findOne(
        {}
      );
      if (productToTestWith) {
        const updatedProduct = {
          ...productToTestWith.dataValues,
          price: 1000
        };
        const id = productToTestWith?.dataValues.id;

        const updateResponse = await api
          .put(`/api/products/${id}`)
          .send(updatedProduct)
          .set('Authorization', `Bearer ${accessToken}`);
        assert400GetResponse(updateResponse);
        expect(updateResponse.body).toStrictEqual({
          Error: 'Only admin users can update products'
        });
      }
    });
    describe('DELETE requests', () => {
      test('Admin user can delete products. Product reviews are automatically deleted', async () => {
        const accessToken = await getToken(adminUser);
        const productToTestWith: ProductModel | null =
          await ProductModel.findOne({
            include: {
              model: Review
            }
          });

        if (productToTestWith) {
          const productId: string = productToTestWith.dataValues.id;

          const deleteResponse = await api
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${accessToken}`);

          // Check that product's reviews were deleted in addition to the product
          const reviews: Review[] | [] = await Review.findAll({
            where: {
              product_id: productId
            }
          });

          expect(deleteResponse.status).toBe(204);
          expect(reviews).toHaveLength(0);
        }
      });

      test('Non-admin user cannot delete products', async () => {
        const accessToken = await getToken(user);
        const productToTestWith: ProductModel | null =
          await ProductModel.findOne({});

        if (productToTestWith) {
          const productId: string = productToTestWith.dataValues.id;

          const deleteResponse = await api
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${accessToken}`);

          assert400GetResponse(deleteResponse);
          expect(deleteResponse.body).toStrictEqual({
            Error: 'Only admin users can delete products'
          });
        }
      });
    });
  });
});

afterAll(async () => {
  await closeDatabaseConnection();
});
