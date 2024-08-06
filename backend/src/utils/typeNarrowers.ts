import {
  User,
  Review,
  Product,
  Mobile,
  Book,
  ClothingItem,
  BeautyItem,
  FurnitureItem,
  Laptop
} from '#src/types/types';

const isString = (param: unknown) => {
  return typeof param === 'string';
};

const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const isObject = (param: unknown): param is object => {
  return param !== null && typeof param === 'object';
};

const isStringArray = (param: unknown): param is string[] => {
  return Array.isArray(param) && param.every((item) => isString(item));
};

const isUser = (param: unknown): param is User => {
  return (
    isObject(param) &&
    'id' in param &&
    isString(param.id) &&
    'username' in param &&
    isString(param.username) &&
    'name' in param &&
    isString(param.name)
  );
};

const isReview = (param: unknown): param is Review => {
  return (
    isObject(param) &&
    'name' in param &&
    isString(param.name) &&
    'title' in param &&
    isString(param.title) &&
    'content' in param &&
    isString(param.title) &&
    'rating' in param &&
    isNumber(param.rating)
  );
};

const parseSpecs = (param: unknown): param is string[] | string => {
  return isStringArray(param);
};

const parseCategory = (param: unknown): boolean => {
  const categories = [
    'Mobiles',
    'Books',
    'Clothings',
    'Beauty',
    'Furniture',
    'Laptops'
  ]

  return (isString(param) && categories.includes(param))
}

const isProduct = (param: unknown): param is Product => {
  return (
    isObject(param) &&
    'title' in param &&
    isString(param.title) &&
    'category' in param &&
    isString(param.category) &&
    'price' in param &&
    isNumber(param.price) &&
    'imgs' in param &&
    isStringArray(param.imgs) &&
    'specs' in param &&
    parseSpecs(param.specs) &&
    'instock' in param &&
    isNumber(param.instock) &&
    'eta' in param &&
    isNumber(param.eta) &&
    'original_id' in param &&
    isString(param.original_id) &&
    'rating' in param &&
    isNumber(param.rating)
  );
};

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

const toProduct = (param: unknown): Product => {
  if (!isProduct(param)) {
    throw new Error('Object has incorrect data for a product');
  }

  switch (param.category) {
    case 'Mobiles': {
      if (!isMobile(param)) {
        throw new Error('Object has incorrect data for a mobile');
      }
      return param;
    }
    case 'Books': {
      if (!isBook(param)) {
        throw new Error('Object has incorrect data for a book');
      }
      return param;
    }
    case 'Clothings': {
      if (!isClothingItem(param)) {
        throw new Error('Object has incorrect data for a clothing item');
      }
      return param;
    }
    case 'Beauty': {
      if (!isBeautyItem(param)) {
        throw new Error('Object has incorrect data for a beauty item');
      }
      return param;
    }
    case 'Furniture': {
      if (!isFurnitureItem(param)) {
        throw new Error('Object has incorrect data for a furniture item');
      }
      return param;
    }
    case 'Laptops': {
      if (!isLaptop(param)) {
        throw new Error('Object has incorrect data for a laptop item');
      }
      return param;
    }
    default: {
      const _exhaustiveCheck: never = param;
      return _exhaustiveCheck;
    }
  }
};

export { isString, isNumber, isReview, toProduct, isUser, parseCategory };
