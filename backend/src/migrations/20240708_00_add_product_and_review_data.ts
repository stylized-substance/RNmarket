import * as data from '../../data/data.json';
import { Product, ReviewWithProductId } from '#src/types';
import { toProduct } from '#src/utils/typeNarrowers';
import { toReviewWithProductId } from '#src/utils/reviews';

// Escape newlines in JSON to make migration work

const { products } = JSON.parse(JSON.stringify(data).replace('\n', '\\n'));

const productArray: Product[] = [];
const reviewArray: ReviewWithProductId[] = [];

for (const product of products) {
  const typeCheckedProduct: Product = toProduct(product);
  productArray.push(typeCheckedProduct);

  if (typeCheckedProduct.reviews) {
    const { reviews } = typeCheckedProduct;
    for (const review of reviews) {
      const reviewWithProductId = toReviewWithProductId(review, product.id);
      reviewArray.push(reviewWithProductId);
    }
  }
}

// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('products', productArray);
    await queryInterface.bulkInsert('reviews', reviewArray);
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('products');
    await queryInterface.bulkDelete('reviews');
  }
};
