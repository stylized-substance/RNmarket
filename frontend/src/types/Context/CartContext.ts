import { CartItem, CartState } from '#src/types/cart';

export type CartContextAction =
  | {
      type: 'added';
      payload: CartItem | CartItem[];
    }
  | {
      type: 'modified';
      payload: CartItem;
    }
  | {
      type: 'removed';
      payload: CartItem;
    }
  | {
      type: 'emptied';
    };

export interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartContextAction>;
}
