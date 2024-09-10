import Response from 'superagent/lib/node/response';
import { isReview, isProduct } from '#src/utils/typeNarrowers';


// Custom assert function for a successful JSON response
export const assertGetResponse = (response: Response) => {
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toMatch(/application\/json/);
};

// Custom assert function for type checking products
export const assertValidProduct = (product: unknown) => {
  const typeCheck = isProduct(product);
  expect(typeCheck).toEqual(true);
};

export const assertValidReview = (review: unknown) => {
  const typeCheck = isReview(review);
  expect(typeCheck).toEqual(true);
}