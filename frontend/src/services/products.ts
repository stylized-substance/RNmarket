import axios from 'axios';
import { Product } from '../types/types';
import { toProduct } from '#src/utils/typeNarrowers';

const apiUrl = 'http://localhost:3003/api';

const getAll = async (): Promise<Product[]> => {
  // const response = await axios.get(`${apiUrl}/products`);
  // console.log(response)
  const response = await axios.get(`${apiUrl}/products`);
  const data = response.data;
  const products = response.data.products;

  if (Array.isArray(data.products)) {
    let products: Product[] = [];
    products = data.products.map((product) => toProduct(product));
    return products;
  } else {
    throw new Error('Error');
  }
};

export default { getAll };
