import { Product } from '#src/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartItemForBackend {
  id: string;
  quantity: number;
}

export type CartState = CartItem[] | [];
