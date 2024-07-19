import * as data from '../../data/data.json';
import { Product, ReviewWithProductId } from '#src/types';
import { toProduct } from '#src/utils/typeNarrowers';
import { toReviewWithProductId } from '#src/utils/reviews';

const { products } = data

const productArray: Product[] = [];
const reviewArray: ReviewWithProductId[] = [];

for (const product of products) {
  const typeCheckedProduct: Product = toProduct(product);
  
  if (typeCheckedProduct.reviews) {
    const { reviews, ...productWithoutReviews } = typeCheckedProduct
    productArray.push(productWithoutReviews);
    for (const review of reviews) {
      const reviewWithProductId = toReviewWithProductId(review, product.id);
      reviewWithProductId.content = reviewWithProductId.content.replace(/\n/g, '')
      reviewArray.push(reviewWithProductId);
    }
  } else {
    productArray.push(typeCheckedProduct);
  }
}

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('products', productArray);
    // await queryInterface.bulkInsert('reviews', reviewArray);
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('products');
    await queryInterface.bulkDelete('reviews');
  }
};
