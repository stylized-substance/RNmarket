import { Review } from '#src/types';

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export interface BaseProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  imgs?: string[];
  specs: string[];
  instock: number;
  eta?: number;
  original_id?: string;
  rating?: number;
  reviews?: Review[];
}

export interface Mobile extends BaseProduct {
  category: 'Mobiles';
  popular?: boolean;
  brand: string;
  ram: string;
}

export interface FurnitureItem extends BaseProduct {
  category: 'Furniture';
  popular?: boolean;
  type: string;
}

export interface Laptop extends BaseProduct {
  category: 'Laptops';
  popular?: boolean;
  for: string;
  brand: string;
  ram: string;
  processor: string;
  displaysize: string;
  has_ssd: string;
}

export type Product = Mobile | FurnitureItem | Laptop;

export enum ProductCategory {
  Mobiles = 'Mobiles',
  Furniture = 'Furniture',
  Laptops = 'Laptops'
}

export type ProductWithoutReviews = UnionOmit<Product, 'reviews'>;

// Types for Express controllers
export interface ProductSearchParameters {
  limit?: number;
  include?: object;
  where?: object;
}

export interface ProductQueryParameters {
  limit?: number;
  withReviews?: string;
  category?: string;
  search?: string;
  lowestPrice?: number;
  highestPrice?: number;
  instock?: string;
  lowestRating?: number;
  highestRating?: number;
}
