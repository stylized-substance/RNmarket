import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

interface ProductFilterState {
  lowestPrice: number;
  highestPrice: number;
  lowestRating: number;
  highestRating: number;
  instock?: "true"
}

type Action = {
  type: 'changed';
  payload: Partial<ProductFilterState>;
}

interface ProductFilterContextType {
  state: ProductFilterState;
  dispatch: React.Dispatch<Action>;
}

const ProductFilterContext = createContext<ProductFilterContextType | null>(null)

const initialState: ProductFilterState = {
  lowestPrice: 0,
  highestPrice: 10000,
  lowestRating: 1,
  highestRating: 5
}

const productFilterReducer = (state: ProductFilterState, action: Action) => {
  return state
}

const ProductFilterContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(productFilterReducer, initialState);

  return (
    <ProductFilterContext.Provider value={{ state, dispatch}}>
      {children}
    </ProductFilterContext.Provider>    
  )
}

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext);

  if (!context) {
    throw new Error('useProductFilter must be used within a ProductFilterContextProvider component')
  }

  return context;
}

export default ProductFilterContextProvider;