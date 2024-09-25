import axios from 'axios';

import { Product } from '../types/types';

const apiUrl = 'http://localhost:3003';

const getAll = async () => {
  const products = await axios.get<Product[]>(`${apiUrl}/products`);
  return products;
};

export default { getAll };
