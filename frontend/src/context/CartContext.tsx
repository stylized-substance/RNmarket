import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

export interface CartContextType {
  cart: string;
  setCart: React.Dispatch<React.SetStateAction<string>>;
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
  const [cart, setCart] = useState<string>('test');

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};


export default CartProvider