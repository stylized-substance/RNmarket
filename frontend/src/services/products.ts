import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { Product, ProductQuery } from '../types/types';
import { isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/products`;

const getAll = async ({
  productCategory,
  searchTerm,
  filter
}: ProductQuery): Promise<Product[] | []> => {
  let query = '';

  if (searchTerm) {
    query = `search=${searchTerm}&`;
  }

  if (productCategory) {
    query = `category=${productCategory}&`;
  }

  if (filter) {
    query += Object.entries(filter)
      .map((property) => `${property[0]}=${property[1]}`)
      .join('&');
  }

  try {
    const response = await axios.get<{ products: Product[] | [] }>(
      `${baseUrl}?${query}`
    );
    return response.data.products;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while getting products');
    }
  }
};

const getOne = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<{ product: Product }>(
      `${baseUrl}/${id}?withReviews=true`
    );
    return response.data.product;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while getting product');
    }
  }
};

export default { getAll, getOne };
