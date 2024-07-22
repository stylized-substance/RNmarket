import * as data from '../../data/data.json';
import { Product, ReviewWithProductId } from '#src/types';
import { toProduct } from '#src/utils/typeNarrowers';
import { toReviewWithProductId } from '#src/utils/reviews';

const { products } = data

// interface ProductObject {
//   [key: string]: string | string[] | number | number[] | boolean
// }

const keysToLowercase = (param: Product) => {
  const entries = Object.entries(param)
  const lowerCased = Object.fromEntries(
    entries.map(([key, value]) => {
      return [key.toLowerCase(), value]
    })
  )
  return lowerCased
  // const newObject: Product = {}
  // Object.keys(param).forEach(key => {
  //   newObject[key.toLowerCase()] = param[key]
  // })
  // return newObject
  // const newObject: ProductObject = {}
  // Object.keys(param).forEach(key => {
  //   newObject[key.toLowerCase()] = param[key]
  // })
  // const transformedProduct = Object.keys(param).forEach(key => key.toLowerCase())
  // return transformedProduct
}

const productArray: Product[] = [];
const reviewArray: ReviewWithProductId[] = [];

for (const product of products) {
  const typeCheckedProduct: Product = toProduct(product);
  // Transform object keys to lowercase to comply with database field names
  const lowerCaseProduct = keysToLowercase(typeCheckedProduct)
  
  if (lowerCaseProduct.reviews) {
    const { reviews, ...productWithoutReviews } = lowerCaseProduct
    productArray.push(productWithoutReviews);
    for (const review of reviews) {
      const reviewWithProductId = toReviewWithProductId(review, product.id);
      reviewWithProductId.content = reviewWithProductId.content.replace(/\n/g, '')
      reviewArray.push(reviewWithProductId);
    }
  } else {
    productArray.push(lowerCaseProduct);
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
