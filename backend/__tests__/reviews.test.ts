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
  assertValidReview
} from '#src/utils/testHelpers';
import { Review as ReviewModel } from '#src/models';
import { User as UserModel, Product as ProductModel } from '#src/models';

const api = supertest(app);

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

describe('GET requests', () => {
  test('Request with query parameter user_id returns reviews for single user', async () => {
    // Get user that has at least one review
    const user: UserModel | null = await UserModel.findOne({
      include: [
        {
          model: ReviewModel,
          required: true
        }
      ]
    });

    const userId: string = user?.dataValues.id;

    const response = await api.get('/api/reviews').query(`user_id=${userId}`);
    assert200GetResponse(response);
    expect(response.body).toHaveProperty('reviews');
    response.body.reviews.forEach((review: unknown) =>
      assertValidReview(review)
    );
  });
  test('Request with query parameter product_id returns reviews for single product', async () => {
    // Get product that has at least one review
    const product: ProductModel | null = await ProductModel.findOne({
      include: {
        model: ReviewModel,
        required: true
      }
    });

    if (product) {
      const response = await api
        .get('/api/reviews')
        .query(`product_id=${product.dataValues.id}`);
      assert200GetResponse(response);
      expect(response.body).toHaveProperty('reviews');
      response.body.reviews.forEach((review: unknown) =>
        assertValidReview(review)
      );
    }
  });
  test('Request fails without query parameters', async () => {
    const response = await api.get('/api/reviews')
    assert400GetResponse(response)
    expect(response.body).toStrictEqual({
      Error: 'Query parameter missing'
    })
  })
});

afterAll(async () => {
  await closeDatabaseConnection();
});
