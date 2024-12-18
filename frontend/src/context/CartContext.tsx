import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

import { CartItem } from '#src/types/types';

type CartState = CartItem[] | [];

type Action =
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
    };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<Action>;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const cartReducer = (state: CartState, action: Action) => {
  switch (action.type) {
    // Add item to cart
    case 'added': {
      // Turn single item into an array
      let payload: CartItem[];
      if (Array.isArray(action.payload)) {
        payload = action.payload;
      } else {
        payload = [action.payload];
      }

      // Copy state array for mofification
      const newState: CartItem[] = [...state];
      
      // Loop through payload items and update state
      for (const payloadItem of payload) {
        const existingItemIndex = newState.findIndex(
          (stateItem) => stateItem.product.id === payloadItem.product.id
        );

        if (existingItemIndex !== -1) {
          // Item is in cart, update it
          newState[existingItemIndex].quantity += payloadItem.quantity;
        } else {
          // Item isn't in cart, add it
          newState.push(payloadItem);
        }
      }

      return newState;
    }
    case 'modified': {
      // Set new quantity for cart item
      const itemToModify = state.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (!itemToModify) {
        throw new Error('Item to modify not found in cart');
      }

      const newState = state.map((item) => {
        if (item.product.id === action.payload.product.id) {
          item.quantity = action.payload.quantity;
        }

        return item;
      });

      return newState;
    }
    case 'removed': {
      // Remove item from cart
      const itemToDelete = state.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (!itemToDelete) {
        throw new Error('Item to delete not found in cart');
      }

      const newState = state.filter(
        (item) => item.product.id !== itemToDelete.product.id
      );

      return newState;
    }
    default: {
      throw new Error('cartReducer was called with unknown action type');
    }
  }
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within a CartContextProvider component'
    );
  }

  return context;
};

export default CartContextProvider;
