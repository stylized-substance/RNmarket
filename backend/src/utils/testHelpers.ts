import Response from 'superagent/lib/node/response';
import { isReview, isProduct } from '#src/utils/typeNarrowers';
import supertest from 'supertest';
import app from '#src/app';

const api = supertest(app);

// Custom assert functions for JSON responses
export const assert200GetResponse = (response: Response) => {
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/application\/json/);
};

export const assert400GetResponse = (response: Response) => {
  expect(response.status).toBe(400);
  expect(response.headers['content-type']).toMatch(/application\/json/);
};

export const assert404GetResponse = (response: Response) => {
  expect(response.status).toBe(404);
  expect(response.headers['content-type']).toMatch(/application\/json/);
};

// Custom assert functions for type checking products and reviews
export const assertValidProduct = (product: unknown) => {
  const typeCheck = isProduct(product);
  expect(typeCheck).toEqual(true);
};

export const assertValidReview = (review: unknown) => {
  const typeCheck = isReview(review);
  expect(typeCheck).toEqual(true);
};

// Login user and return accessToken

export const getToken = async (user: {
  username: string;
  password: string;
}): Promise<string> => {
  const loginResponse = await api.post('/api/authorization/login').send(user);
  return loginResponse.body.payload.accessToken;
};
