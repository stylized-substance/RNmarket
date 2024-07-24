import { products } from '../../data/data.json';
import { Product, Review } from '#src/types';
import { toProduct } from '#src/utils/typeNarrowers';

const productArray: Product[] = [];
const reviewArray: Review[] = [];

for (const product of products) {
  const typeCheckedProduct: Product = toProduct(product);
  
  if (typeCheckedProduct.reviews) {
    const { reviews, ...productWithoutReviews } = typeCheckedProduct
    productArray.push(productWithoutReviews);
    for (const review of reviews) {
      reviewArray.push(review);
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
    await queryInterface.bulkInsert('reviews', reviewArray);
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('products');
    await queryInterface.bulkDelete('reviews');
  }
};
