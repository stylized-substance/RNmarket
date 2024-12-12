import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

interface CartItem {
  id: string;
  quantity: number;
}

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
  cartState: CartState;
  cartDispatch: React.Dispatch<Action>;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const cartReducer = (state: CartState, action: Action) => {
  switch (action.type) {
    // Add item to cart
    case 'added': {
      let newState;

      if (Array.isArray(action.payload)) {
        newState = [...state, ...action.payload];
        return newState;
      }

      newState = [...state, action.payload];

      return newState;
    }
    case 'modified': {
      // Set new quantity for cart item
      const itemToModify = state.find((item) => item.id === action.payload.id);

      if (!itemToModify) {
        throw new Error('Item to modify not found in cart');
      }

      const newState = state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = action.payload.quantity;
        }

        return item;
      });

      return newState;
    }
    case 'removed': {
      // Remove item from cart
      const itemToDelete = state.find((item) => item.id === action.payload.id);

      if (!itemToDelete) {
        throw new Error('Item to delete not found in cart');
      }

      const newState = state.filter((item) => item.id !== itemToDelete.id);

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
