import { AxiosError } from 'axios';

// Type for API error response for use in service modules
export interface ApiErrorResponse extends AxiosError {
  'Error': string;
}

export interface NewUser {
  username: string;
  name: string;
  password: string;
  isadmin: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Type for API response for successful login
export interface LoginPayload {
  username: string;
  name: string;
  id: string;
  isadmin: boolean;
  accessToken: string;
  refreshToken: string;
}

// Types for reviews, orders, products and users
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
}

export type ReviewFromBackend = Review & {
  ProductId: string;
  UserId: string;
  createdAt: string;
  updatedAt: string;
};

export type NewReview = Omit<Review, 'id' | 'user_id' | 'name'>;

export interface NewOrder {
  products: {
    id: string;
    quantity: number;
  }[];
  email: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

export type OrderInDb = Omit<NewOrder, 'products'> & {
  id: string;
};
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartItemForBackend {
  id: string;
  quantity: number;
};

export type CartState = CartItem[] | [];

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
  Reviews?: Review[];
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


export type ProductSortOption =
  | 'nameAsc'
  | 'nameDesc'
  | 'priceAsc'
  | 'priceDesc'
  | 'ratingAsc'
  | 'ratingDesc';