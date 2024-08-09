import {
  User,
  Review,
  Product,
  NewProduct,
  Mobile,
  Book,
  ClothingItem,
  BeautyItem,
  FurnitureItem,
  Laptop,
  ProductCategory
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

const isProductCategory = (param: string): param is ProductCategory => {
  return Object.values(ProductCategory)
    .map((value) => value.toString())
    .includes(param);
};

const isNewProduct = (param: unknown): param is NewProduct => {
  return (
    isObject(param) &&
    'title' in param &&
    isString(param.title) &&
    'category' in param &&
    isString(param.category) &&
    'price' in param &&
    isNumber(param.price) &&
    'specs' in param &&
    (isString(param.specs) || isStringArray(param.specs)) &&
    'instock' in param &&
    isNumber(param.instock)
  );
};

const isProductWithId = (param: unknown): param is Product => {
  return (
    isNewProduct(param) &&
    'id' in param &&
    isString(param.id)
  )
}

const isMobile = (product: NewProduct): product is Mobile => {
  return (
    product.category === 'Mobiles' &&
    'brand' in product &&
    isString(product.brand) &&
    'ram' in product &&
    isString(product.ram)
  )
};

const isBook = (product: NewProduct): product is Book => {
  return (
    product.category === 'Books' &&
    'language' in product &&
    isString(product.language) &&
    'genre' in product &&
    isString(product.genre)
  )
};

const isClothingItem = (product: NewProduct): product is ClothingItem => {
  return (
    product.category === 'Clothings' &&
    'for' in product &&
    isString(product.for)
  )
};

const isBeautyItem = (product: NewProduct): product is BeautyItem => {
  return (
    product.category === 'Beauty' &&
    'type' in product &&
    isString(product.type)
  )
};

const isFurnitureItem = (product: NewProduct): product is FurnitureItem => {
  return (
    product.category === 'Furniture' &&
    'type' in product &&
    isString(product.type)
  )
};

const isLaptop = (product: NewProduct): product is Laptop => {
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
  )
};

// const parseSpecs = (param: unknown): string[] | string => {
//   if (!isStringArray(param) || !isString(param)) {
//     throw new Error("Invalid specs property");
//   }

//   return param
// };

const parseProductCategory = (param: unknown): ProductCategory => {
  if (!isString(param) || !isProductCategory(param)) {
    throw new Error('Invalid product category');
  }

  return param;
};

const toProduct = (param: unknown): Product => {
  if (!isProductWithId(param)) {
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

// const toNewProduct = (param: unknown): NewProduct => {
//   if (!isObject(param)) {
//     throw new Error('Input must be an object');
//   }

//   const newProduct = toProduct(param)

//   return newProduct
// }

export {
  isString,
  isNumber,
  isReview,
  toProduct,
  isUser,
  parseProductCategory
};
