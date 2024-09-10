import Response from 'superagent/lib/node/response';
import { isReview, isProduct } from '#src/utils/typeNarrowers';


// Custom assert functions for JSON responses
export const assert200GetResponse = (response: Response) => {
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/application\/json/);
};

export const assert400GetResponse = (response: Response) => {
  expect(response.status).toBe(400);
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
}