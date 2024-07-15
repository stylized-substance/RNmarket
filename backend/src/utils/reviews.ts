import { ReviewWithProductId } from '#src/types';
import { isReview, isReviewWithProductId } from './typeNarrowers';

const toReviewWithProductId = (
  review: unknown,
  product_id: string
): ReviewWithProductId => {
  if (!isReview(review)) {
    throw new Error('Input is not a valid review');
  }

  const newReview: ReviewWithProductId = {
    product_id: product_id,
    ...review
  };

  if (!isReviewWithProductId(newReview)) {
    throw new Error('New review is not valid');
  }

  return newReview;
};

export { toReviewWithProductId };
