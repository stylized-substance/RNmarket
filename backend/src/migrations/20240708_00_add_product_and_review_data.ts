import * as data from '../../data/data.json'
import { Review, ProductWithoutReviews } from '#src/types'

const products: Product[] = data

const { reviews, ...productsArray }: { reviews: Review[]; productsArray: ProductWithoutReviews[] } = products

const { reviews } = products

// { reviews: Review[]; productsArray: ProductWithoutReviews[]} 
console.log(reviewsArray, productsArray)
// const productReviews: Review[] = products.map({ reviews } => reviews)

// Using ES5 export so Umzug can work with it
module.exports = {
  // // @ts-expect-error - no type available for queryInterface
  // up: async ({ context: queryInterface }) => {
  //   await queryInterface.bulkInsert()
  // }
}