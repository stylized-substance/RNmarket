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
  specs: string[] | string;
  inStock: number;
  eta: number;
  id: string;
  rating: number;
  reviews?: Review[];
}

export interface Mobile extends BaseProduct {
  category: 'Mobiles';
  popular?: boolean;
  Brand: string;
  RAM: string;
}

export interface Book extends BaseProduct {
  category: 'Books';
  popular?: boolean;
  Language: string;
  Genre: string;
}

export interface ClothingItem extends BaseProduct {
  category: 'Clothings';
  popular?: boolean;
  For: string;
}

export interface BeautyItem extends BaseProduct {
  category: 'Beauty';
  popular?: boolean;
  Type: string;
}

export interface FurnitureItem extends BaseProduct {
  category: 'Furniture';
  popular?: boolean;
  Type: string;
}

export interface Laptop extends BaseProduct {
  category: 'Laptops';
  popular?: boolean;
  For: string;
  Brand: string;
  RAM: string;
  Processor: string;
  DisplaySize: string;
  HasSSD: string;
}

export type Product =
  | Mobile
  | Book
  | ClothingItem
  | BeautyItem
  | FurnitureItem
  | Laptop;

export type ProductWithoutReviews = UnionOmit<Product, 'reviews'>;
