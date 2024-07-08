import {
  Product,
  BaseProduct,
  Mobile,
  Book,
  ClothingItem,
  BeautyItem,
  FurnitureItem,
  Laptop
} from '#src/types';

const isString = (param: unknown) => {
  return typeof param === 'string' || param instanceof String;
}

export const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const isObject = (param: unknown): param is object => {
  return param !== null &&  typeof param === 'object'
}

const isBaseProduct = (param: unknown): param is BaseProduct => {
  return (
    isObject(param) &&
    'title' in param &&
    'category' in param &&
    'price' in param &&
    'imgs' in param &&
    'specs' in param &&
    'inStock' in param &&
    'eta' in param &&
    'id' in param &&
    'rating' in param &&
    'reviews' in param
  )
}

const isMobile = (product: Product): product is Mobile => {
  return product.category === 'Mobiles';
};

const isBook = (product: Product): product is Book => {
  return product.category === 'Books';
};

const isClothingItem = (product: Product): product is ClothingItem => {
  return product.category === 'Clothings';
};

const isBeautyItem = (product: Product): product is BeautyItem => {
  return product.category === 'Beauty';
};

const isFurnitureItem = (product: Product): product is FurnitureItem => {
  return product.category === 'Furniture';
};

const isLaptop = (product: Product): product is Laptop => {
  return product.category === 'Laptops';
};


export const checkProductType = (product: Product)