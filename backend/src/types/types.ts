// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

// Types for reviews, products and users

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
};

export type NewReview = Omit<Review, 'id' | 'user_id' | 'name'>

export interface User {
  id: string;
  username: string;
  name: string;
  passwordhash: string | null;
  isadmin: boolean;
}

export interface NewUser {
  username: string;
  name: string;
  password: string;
  isadmin: boolean;
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

export type ProductWithoutReviews = UnionOmit<Product, 'reviews'>;

//export type NewProduct = UnionOmit<Product, 'id'>;

//export type NewProduct = Pick<Product, 'title' | 'category' | 'price' | 'specs'>

// Types for epxress controllers
export interface ProductSearchParameters {
  limit?: number;
  include?: object;
  where?: object;
}
