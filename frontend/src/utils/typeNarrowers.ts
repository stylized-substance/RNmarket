// import { Product } from "../types/types";
import {
  Product,
  ProductCategory
} from '#src/types/types';

const isString = (param: unknown): param is string => {
  return typeof param === 'string';
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
  console.log(typeof param)
  return Object.values(ProductCategory)
    .map((value) => value.toString())
    .includes(param);
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

export { isProduct, isObject }
