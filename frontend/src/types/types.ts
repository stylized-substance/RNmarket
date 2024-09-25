// Types for reviews, products and users
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
}

export interface BaseProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  imgs?: string[];
  specs: string[];
  instock?: number;
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

export interface Book extends BaseProduct {
  category: 'Books';
  popular?: boolean;
  language: string;
  genre: string;
}

export interface ClothingItem extends BaseProduct {
  category: 'Clothings';
  popular?: boolean;
  for: string;
}

export interface BeautyItem extends BaseProduct {
  category: 'Beauty';
  popular?: boolean;
  type: string;
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

export type Product =
  | Mobile
  | Book
  | ClothingItem
  | BeautyItem
  | FurnitureItem
  | Laptop;

export enum ProductCategory {
  Mobiles = 'Mobiles',
  Books = 'Books',
  Clothings = 'Clothings',
  Beauty = 'Beauty',
  Furniture = 'Furniture',
  Laptops = 'Laptops'
}
