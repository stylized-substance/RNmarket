import axios from 'axios';
import { Product } from '../types/types';
import { isProduct, isObject } from '#src/utils/typeNarrowers';

const apiUrl = 'http://localhost:3003/api';

interface GetProductsResponse {
  products: Product[];
}

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
    const response = await axios.get<GetProductsResponse>(`${apiUrl}/products`);
    if (responseIsValid(response.data)) {
      return response.data.products;
    } else {
      throw new Error(
        `Error: Invalid API response while getting products: ${JSON.stringify(response.data)}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error}`);
    }
  }

  return [];
};

export default { getAll };
