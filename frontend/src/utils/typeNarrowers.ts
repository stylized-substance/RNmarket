import {
  Product,
  ProductCategory,
  NewReview,
  ApiErrorResponse
} from '#src/types/types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string';
};

const parseString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Type error: Input is not a string`);
  }

  return param;
};

const isNumber = (param: unknown): param is number => {
  let value;

  if (typeof param === 'string') {
    value = Number(param);
  } else {
    value = param;
  }

  return typeof value === 'number' && !isNaN(value);
};

const isObject = (param: unknown): param is object => {
  return param !== null && typeof param === 'object';
};

const isStringArray = (param: unknown): param is string[] => {
  return Array.isArray(param) && param.every((item) => isString(item));
};

const isProductCategory = (param: string): param is ProductCategory => {
  return Object.values(ProductCategory)
    .map((value) => value.toString())
    .includes(param);
};


const isNewReview = (param: unknown): param is NewReview => {
  return (
    isObject(param) &&
    'product_id' in param &&
    isString(param.product_id) &&
    'title' in param &&
    isString(param.title) &&
    'content' in param &&
    isString(param.title) &&
    'rating' in param &&
    isNumber(param.rating)
  );
};

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

const isApiErrorResponse = (param: unknown): param is ApiErrorResponse => {
  return (
    isObject(param) &&
    'Error' in param &&
    isString(param.Error)
  );
}

export { isProduct, isObject, isString, parseString, isNewReview, isApiErrorResponse }
