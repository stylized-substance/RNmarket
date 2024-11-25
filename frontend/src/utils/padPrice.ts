// Function adds a trailing zero to product price if needed to get to 2 decimal places
export const padPrice = (price: number): string => {
  const [integer, decimals] = String(price).split('.');
  let decimalsPadded;

  if (!decimals) {
    decimalsPadded = '00';
  } else {
    decimalsPadded = decimals.padEnd(2, '0');
  }

  return `${integer}.${decimalsPadded}`;
};
