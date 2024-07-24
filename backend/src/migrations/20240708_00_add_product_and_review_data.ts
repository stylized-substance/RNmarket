import { products } from '../../data/data.json';
import { Product, Review } from '#src/types';
import { toProduct } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const productArray: Product[] = [];
const reviewArray: Review[] = [];

for (const product of products) {
  const typeCheckedProduct: Product = toProduct(product);

  const productId = uuidv4();

  typeCheckedProduct.id = productId;

  if (typeCheckedProduct.reviews) {
    const { reviews, ...productWithoutReviews } = typeCheckedProduct;
    productArray.push(productWithoutReviews);
    for (const review of reviews) {
      review.product_id = productId;
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
