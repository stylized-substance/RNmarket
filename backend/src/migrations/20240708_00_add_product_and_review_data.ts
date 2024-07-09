import * as data from '../../data/data.json';
// import { Review, ProductWithoutReviews, Product } from '#src/types'
// import { toProduct, isReview } from '../utils/typeNarrowers'

const { products } = data;
console.log(products);

// Using ES5 export so Umzug can work with it
module.exports = {
  // // @ts-expect-error - no type available for queryInterface
  // up: async ({ context: queryInterface }) => {
  //   await queryInterface.bulkInsert()
  // }
};
