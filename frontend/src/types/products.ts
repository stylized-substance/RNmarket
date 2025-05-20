import { Review } from '#src/types';

export interface BaseProduct {
  id: string;
  title: string;
  lowerCaseTitle?: string;
  category: ProductCategory;
  price: number;
  imgs?: string[];
  specs: string[];
  instock: number;
  eta?: number;
  original_id?: string;
  rating?: number;
  Reviews?: Review[];
  createdAt: string;
  updatedAt: string;
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

export type NewProduct = Pick<
  BaseProduct,
  'category' | 'title' | 'price' | 'instock'
> & {
  specs: string | string[];
};

export type EditedProduct = Pick<BaseProduct, 'title' | 'price' | 'instock'>;

export type ProductCategory = 'Mobiles' | 'Furniture' | 'Laptops';

export interface ProductQuery {
  searchTerm?: string;
  parsedProductCategory?: ProductCategory;
  filterQuery?: string;
}

export interface ProductFilterState {
  lowestPrice?: number;
  highestPrice?: number;
  lowestRating?: number;
  highestRating?: number;
  instock?: boolean;
}

export type ProductSortOption =
  | 'nameAsc'
  | 'nameDesc'
  | 'priceAsc'
  | 'priceDesc'
  | 'ratingAsc'
  | 'ratingDesc';
