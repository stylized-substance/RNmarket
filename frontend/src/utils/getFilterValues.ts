import { Product } from '#src/types';

// Take in an array of products and find lowest and highest price, and lowest and highest rating. Round prices to integers.
export const getFilterValues = (products: Product[]) => {
  const prices = products.map((product) => product.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const ratings = products
    .map((product) => product.rating)
    .filter((rating) => rating !== undefined);
  const lowestRating = Math.min(...ratings);
  const highestRating = Math.max(...ratings);

  return { lowestPrice, highestPrice, lowestRating, highestRating };
};
