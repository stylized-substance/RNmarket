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
  assertValidReview,
  getToken
} from '#src/utils/testHelpers';
import { Review as ReviewModel } from '#src/models';
import { User as UserModel, Product as ProductModel } from '#src/models';

const api = supertest(app);

beforeAll(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('GET requests', () => {
  test('GET /api/reviews with query parameter user_id returns reviews for single user', async () => {
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
  test('GET /api/reviews with query parameter product_id returns reviews for single product', async () => {
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
  test('GET /api/reviews fails without query parameters', async () => {
    const response = await api.get('/api/reviews');
    assert400GetResponse(response);
    expect(response.body).toStrictEqual({
      Error: 'Query parameter missing'
    });
  });
});
describe('POST requests', () => {
  test('Logged in user can add a review', async () => {
    const user = {
      username: 'test_user@example.org',
      password: 'password'
    };

    // Get valid product to add review to
    const productToTestWith: ProductModel | null = await ProductModel.findOne(
      {}
    );

    if (productToTestWith) {
      const review = {
        product_id: productToTestWith.dataValues.id,
        title: 'test_title',
        content: 'test_content',
        rating: 1
      };

      const accessToken = await getToken(user);

      const reviewAddResponse = await api
        .post('/api/reviews/')
        .send(review)
        .set('Authorization', `Bearer ${accessToken}`);

      assert200GetResponse(reviewAddResponse);
      expect(reviewAddResponse.body).toHaveProperty('addedReview');
      assertValidReview(reviewAddResponse.body.addedReview);
    }
  });
});
