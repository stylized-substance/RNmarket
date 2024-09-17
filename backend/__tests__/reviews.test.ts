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
  assert404GetResponse,
  assertValidReview,
  getToken
} from '#src/utils/testHelpers';
import { Review, NewReview } from '#src/types/types';
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
  test('GET /api/reviews with product_id query returns 404 if product has no reviews', async () => {
    // Add a test product that has no reviews
    const productToAdd = {
      title: 'test_title',
      category: 'Mobiles',
      price: 10,
      specs: ['test_specs'],
      brand: 'test_brand',
      ram: '8GB'
    };

    const adminUser = {
      username: 'admin@example.org',
      password: 'password'
    };

    const accessToken = await getToken(adminUser);

    const productAddResponse = await api
    .post('/api/products')
    .send(productToAdd)
    .set('Authorization', `Bearer ${accessToken}`);
    
    // Try to get product reviews
    const response = await api
      .get('/api/reviews')
      .query(`product_id=${productAddResponse.body.addedProduct.id}`)

    assert404GetResponse(response)
    expect(response.body).toStrictEqual({
      Error: 'No reviews found'
    })
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
      const review: NewReview = {
        product_id: productToTestWith.dataValues.id,
        title: 'test_title',
        content: 'test_content',
        rating: 1
      };

      const accessToken: string = await getToken(user);

      const response = await api
        .post('/api/reviews/')
        .send(review)
        .set('Authorization', `Bearer ${accessToken}`);

      assert200GetResponse(response);
      expect(response.body).toHaveProperty('addedReview');
      assertValidReview(response.body.addedReview);
    }
  });
});
describe('PUT requests', () => {
  test('Logged in user can edit own review', async () => {
    // Save a review and try to edit it
    const user = {
      username: 'test_user@example.org',
      password: 'password'
    };

    // Get valid product to add review to
    const productToTestWith: ProductModel | null = await ProductModel.findOne(
      {}
    );

    if (productToTestWith) {
      const review: NewReview = {
        product_id: productToTestWith.dataValues.id,
        title: 'test_title',
        content: 'test_content',
        rating: 1
      };

      const accessToken: string = await getToken(user);

      const reviewAddResponse = await api
        .post('/api/reviews/')
        .send(review)
        .set('Authorization', `Bearer ${accessToken}`);

      // Try to edit the review
      if (reviewAddResponse.body.addedReview) {
        const review = reviewAddResponse.body.addedReview;

        const editedReview: Review = {
          ...review,
          content: 'new_test_content'
        };

        const reviewEditResponse = await api
          .put(`/api/reviews/${review.id}`)
          .send(editedReview)
          .set('Authorization', `Bearer ${accessToken}`);

        assert200GetResponse(reviewEditResponse);
        expect(reviewEditResponse.body).toHaveProperty('saveResult');
        assertValidReview(reviewEditResponse.body.saveResult);
      }
    }
  });
});
