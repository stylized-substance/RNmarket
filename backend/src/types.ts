// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type Review = {
  name: string;
  title: string;
  content: string;
  rating: number;
};

export interface ReviewWithProductId extends Review {
  product_id: string;
}

export interface BaseProduct {
  title: string;
  category: string;
  price: number;
  imgs: string[];
  specs: string[];
  instock: number;
  eta: number;
  original_id: string;
  rating: number;
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

export type ProductWithoutReviews = UnionOmit<Product, 'reviews'>;
