import * as data from '../../data/data.json';
import { Review } from '#src/types'
import { isReview } from '../utils/typeNarrowers'
// import _ from 'lodash';

const { products } = data;

const reviews = products.map((product) => {
  if (!product.reviews.every(isReview)) {
    return
  }
  const productReviews = product.reviews.map((review) => {
    review.product_id = product.id
    review.rating = Number(review.rating)
    
    console.log(review)
    return productReviews
  })
  console.log(productReviews)
})

console.log(reviews)


// const mobiles = products.filter(product => product.category === 'Mobiles')
// const mobilesTypeNarrowed = mobiles.forEach(product => console.log(toProduct(product)))
// console.log(mobilesTypeNarrowed)

// const productsTypeNarrowed = products.map(product => toProduct(product))
// const productsGroupedByCategory = _.groupBy(products, 'category')
// const { Mobiles, Books, Clothings, Beauty, Furniture, Laptops } = productsGroupedByCategory.map(product => toProduct(product))
// console.log(Mobiles, Books, Clothings, Beauty, Furniture, Laptops)
// const { reviews } = products

// Using ES5 export so Umzug can work with it
module.exports = {
  // // @ts-expect-error - no type available for queryInterface
  // up: async ({ context: queryInterface }) => {
  //   await queryInterface.bulkInsert()
  // }
};
