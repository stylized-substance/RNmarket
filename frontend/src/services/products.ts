import axios from 'axios';
import { Product } from '../types/types';
import { isProduct, isObject, isString } from '#src/utils/typeNarrowers';
import errorHandler from '#src/utils/errorHandler';

const apiUrl = 'http://localhost:3003/api';

const getAll = async (): Promise<Product[] | []> => {
  const responseIsValid = (response: unknown): boolean => {
    return (
      isObject(response) &&
      'products' in response &&
      Array.isArray(response.products) &&
      response.products.every((product) => isProduct(product))
    );
  };

  try {
    const response = await axios.get<{ products: Product[] }>(`${apiUrl}/products`);
    if (responseIsValid(response.data)) {
      return response.data.products;
    } else {
      throw new Error(
        `Invalid API response while getting products: ${JSON.stringify(response.data)}`
      );
    }
  } catch (error) {
    console.error(errorHandler(error));
  }

  return [];
};

const getOne = async (id: string): Promise<Product | null> => {
  if (isString(id)) {
    try {
      const response = await axios.get<{ product:  Product }>(`${apiUrl}/products/${id}`)
      return response.data.product
    } catch (error) {
      console.error(errorHandler(error))
    }
  } else {
    console.error(errorHandler('Invalid input id for getOne function'))
  }

  return null
}

export default { getAll, getOne };
