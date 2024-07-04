export type Review = {
  name: string;
  title: string;
  content: string;
  rating: number
}

export interface Product {
  title: string;
  category: string;
  price: number;
  imgs: string[];
  specs: string[];
  inStock: number;
  eta: number;
  id: string;
  rating: number;
  reviews: Review[]
}

export interface Mobile extends Product {
  popular?: boolean
  Brand: string
  RAM: string
}

export interface Book extends Product {
  popular?: boolean
  Language: string
  Genre: string
}

export interface ClothingItem extends Product {
  popular?: boolean
  For: string
}

export interface BeautyItem extends Product {
  popular?: boolean
  Type: string
}

export interface FurnitureItem extends Product {
  popular?: boolean
  Type: string
}

export interface Laptop extends Product {
  popular?: boolean
  For: string
  Brand: string
  RAM: string
  Processor: string
  DisplaySize: string
  HasSSD: string
}

