import { products } from '../../data/data.json';
import { Product, Review, User } from '#src/types';
import { toProduct, isReview } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const productArray: Product[] = [];
const reviewArray: Review[] = [];
const userNameArray: string[] = [];
const userArray: User[] = [];

for (const product of products) {
  const typeCheckedProduct: Product = toProduct(product);

  const productId = uuidv4();

  typeCheckedProduct.id = productId;

  if (typeCheckedProduct.reviews) {
    const { reviews, ...productWithoutReviews } = typeCheckedProduct;

    productArray.push(productWithoutReviews);

    // Loop through reviews and find all unique users
    for (const review of reviews) {
      if (!(userNameArray.includes(review.name))) {
        userNameArray.push(review.name)
      }
    }

    // Add user and products ids to reviews
    for (const review of reviews) {
      if (isReview(review)) {
        review.product_id = productId;
        review.id = uuidv4();
        const reviewUser = userArray.find(user => user.name === review.name)
        if (reviewUser) {
          review.user_id = reviewUser.id
        }
        reviewArray.push(review);
      } else {
        throw new Error('Invalid data for a review');
      }
    }
  } else {
    productArray.push(typeCheckedProduct);
  }
}

// Turn user names into user objects
for (const name of userNameArray) {
  const user: User = {
    id: uuidv4(),
    username: `${name.replace(/\s/g, '')}@example.org`, // Remove whitespace from name
    name: name
  };
  userArray.push(user)
}

console.log('userArray', userArray)


// Using ES5 export so Umzug can work with it
module.exports = {
  // @ts-expect-error - no type available for queryInterface
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', userArray);
    await queryInterface.bulkInsert('products', productArray);
    await queryInterface.bulkInsert('reviews', reviewArray);
  },
  // @ts-expect-error - no type available for queryInterface
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users');
    await queryInterface.bulkDelete('products');
    await queryInterface.bulkDelete('reviews');
  }
};
