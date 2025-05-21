import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

import orderBy from 'lodash/orderBy';
import { ProductContextAction, ProductContextType } from '#src/types';

const ProductContext = createContext<ProductContextType | null>(null);

const initialState: ProductContextType['state'] = {
  products: [],
  sortOption: 'nameAsc',
  filter: {},
  filterShouldInitialize: true
};

const productReducer = (
  state: ProductContextType['state'],
  action: ProductContextAction
): ProductContextType['state'] => {
  switch (action.type) {
    case 'added': {
      return { ...state, products: action.payload };
    }
    case 'reinitializedProducts': {
      return { ...state, products: [] };
    }
    case 'sorted': {
      // Temporarily add lowercase titles to products so orderBy function works properly when sorting by name
      const lowerCaseProducts = state.products.map((prod) => ({
        ...prod,
        lowerCaseTitle: prod.title.toLowerCase()
      }));

      let sortedProducts;
      switch (action.payload.sortOption) {
        case 'nameAsc':
          sortedProducts = orderBy(
            lowerCaseProducts,
            ['lowerCaseTitle'],
            ['asc']
          );
          break;
        case 'nameDesc':
          sortedProducts = orderBy(
            lowerCaseProducts,
            ['lowerCaseTitle'],
            ['desc']
          );
          break;
        case 'priceAsc':
          sortedProducts = orderBy(state.products, ['price'], ['asc']);
          break;
        case 'priceDesc':
          sortedProducts = orderBy(state.products, ['price'], ['desc']);
          break;
        case 'ratingAsc':
          sortedProducts = orderBy(state.products, ['rating'], ['asc']);
          break;
        case 'ratingDesc':
          sortedProducts = orderBy(state.products, ['rating'], ['desc']);
          break;
        default: {
          const _exhaustiveCheck: never = action.payload.sortOption;
          return _exhaustiveCheck;
        }
      }

      // Discard lowercase titles
      const mappedProducts = sortedProducts.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ lowerCaseTitle, ...rest }) => rest
      );

      return {
        ...state,
        sortOption: action.payload.sortOption,
        products: mappedProducts
      };
    }
    case 'filtered': {
      return { ...state, filter: action.payload.filter };
    }
    case 'toggledFilterShouldInitialize': {
      return { ...state, filterShouldInitialize: action.payload.value };
    }
    default: {
      throw new Error('productReducer was called with an unknown action type');
    }
  }
};

const ProductContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts must be used within a ProductContextProvider');
  }

  return context;
};

export default ProductContextProvider;
