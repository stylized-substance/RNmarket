// import { Product } from "../types/types";
import {
  Product,
  Mobile,
  Book,
  ClothingItem,
  BeautyItem,
  FurnitureItem,
  Laptop,
} from '#src/types/types';

const isProduct = (param: unknown): param is Product => {
  return (
    isObject(param) &&
    'title' in param &&
    isString(param.title) &&
    'category' in param &&
    isString(param.category) &&
    isProductCategory(param.category) &&
    'price' in param &&
    isNumber(param.price) &&
    'specs' in param &&
    isStringArray(param.specs)
  );
};

const isMobile = (product: Product): product is Mobile => {
  return (
    product.category === 'Mobiles' &&
    'brand' in product &&
    isString(product.brand) &&
    'ram' in product &&
    isString(product.ram)
  );
};

const isBook = (product: Product): product is Book => {
  return (
    product.category === 'Books' &&
    'language' in product &&
    isString(product.language) &&
    'genre' in product &&
    isString(product.genre)
  );
};

const isClothingItem = (product: Product): product is ClothingItem => {
  return (
    product.category === 'Clothings' &&
    'for' in product &&
    isString(product.for)
  );
};

const isBeautyItem = (product: Product): product is BeautyItem => {
  return (
    product.category === 'Beauty' && 'type' in product && isString(product.type)
  );
};

const isFurnitureItem = (product: Product): product is FurnitureItem => {
  return (
    product.category === 'Furniture' &&
    'type' in product &&
    isString(product.type)
  );
};

const isLaptop = (product: Product): product is Laptop => {
  return (
    product.category === 'Laptops' &&
    'for' in product &&
    isString(product.for) &&
    'brand' in product &&
    isString(product.brand) &&
    'ram' in product &&
    isString(product.ram) &&
    'processor' in product &&
    isString(product.processor) &&
    'displaysize' in product &&
    isString(product.displaysize) &&
    'has_ssd' in product &&
    isString(product.has_ssd)
  );
};


const toProduct = (param: unknown): Product => {
  if (!isProduct(param)) {
    throw new TypeNarrowingError('Object has incorrect data for a product');
  }

  switch (param.category) {
    case 'Mobiles': {
      if (!isMobile(param)) {
        throw new TypeNarrowingError('Object has incorrect data for a mobile');
      }
      return param;
    }
    case 'Books': {
      if (!isBook(param)) {
        throw new TypeNarrowingError('Object has incorrect data for a book');
      }
      return param;
    }
    case 'Clothings': {
      if (!isClothingItem(param)) {
        throw new TypeNarrowingError(
          'Object has incorrect data for a clothing item'
        );
      }
      return param;
    }
    case 'Beauty': {
      if (!isBeautyItem(param)) {
        throw new TypeNarrowingError(
          'Object has incorrect data for a beauty item'
        );
      }
      return param;
    }
    case 'Furniture': {
      if (!isFurnitureItem(param)) {
        throw new TypeNarrowingError(
          'Object has incorrect data for a furniture item'
        );
      }
      return param;
    }
    case 'Laptops': {
      if (!isLaptop(param)) {
        throw new TypeNarrowingError(
          'Object has incorrect data for a laptop item'
        );
      }
      return param;
    }
    default: {
      const _exhaustiveCheck: never = param;
      return _exhaustiveCheck;
    }
  }
}