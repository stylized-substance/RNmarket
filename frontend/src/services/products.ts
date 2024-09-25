import axios from 'axios';
// import { Product } from '../types/types';
// import { toProduct } from '#src/utils/typeNarrowers';

const apiUrl = 'http://localhost:3003';

const getAll = async () => {
  const response = await axios.get(`${apiUrl}/products`);
  console.log(response)
  // let products: unknown = await axios.get(`${apiUrl}/products`);
  // if (Array.isArray(products)) {
  //   products = products.map(product => toProduct(product))
  //   products
  // }
  // return products;
};

export default { getAll };
