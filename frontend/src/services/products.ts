import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { Product, ProductQuery } from '../types/types';
import { isApiErrorResponse, isString } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/products`;

const getAll = async ({
  searchTerm,
  productCategory,
  filterQuery
}: ProductQuery): Promise<Product[] | []> => {
  let query = '?';

  if (searchTerm) {
    query += `search=${searchTerm}&`;
  }

  if (productCategory) {
    query += `category=${productCategory}&`;
  }

  if (filterQuery) {
    query += filterQuery;
  }

  try {
    const response = await axios.get<{ products: Product[] | [] }>(
      `${baseUrl}${query}`
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

const deleteOne = async (id: string, accessToken?: string) => {
  if (!isString(accessToken) || accessToken.length === 0) {
    throw new Error('Access token missing or invalid');
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.status !== 204) {
      console.error(
        `Got response code ${response.status} while deleting product`
      );
    }
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while deleting product');
    }
  }
};

export default { getAll, getOne, deleteOne };
