import { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface ProductState {
  id: string | null
}

interface ProductAction {
  type: 'UPDATE',
  payload: string
}

interface ProductContext {
  product: ProductState;
  productDispatch: Dispatch<ProductAction>;
}

// ProductContext contains id of product to show in 'SingleProduct' component

const ProductContext = createContext<ProductContext | undefined>(undefined)

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  console.log('reducer', state, action)
  switch (action.type) {
    case 'UPDATE':
      return { id: action.payload }
    default:
      return state
  }
}

export const ProductContextProvider = ({ children }: {children: ReactNode}) => {
  const initialState: ProductState = { id: null }

  const [product, productDispatch] = useReducer(productReducer, initialState)

  return (
    <ProductContext.Provider value={{ product, productDispatch }} >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext