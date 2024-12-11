import { Product } from '#src/types/types.ts';
import { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react'

export interface CartContextType {
  state: Product[] | []
  dispatch: 
}

// TODO: specify types
interface CartReducerType {
  state: Product[] | [];
  action: {
    payload: Product,
    type: string
  }
}

export const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
} 

const CartProvider = ({ children }: PropsWithChildren) => {
  const initialState = []
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


const cartReducer = ({ state, action }: CartReducerType) => {
  switch (action.type) {
    case 'added': {
      return [ ...state, action.payload ]
    }
    case 'deleted': {
      return [ ...state ]
    }
    default: {
      throw new Error('cartReducer was called with unknown action type')
    }
  }
}

export default CartProvider