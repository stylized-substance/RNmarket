import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

import orderBy from 'lodash/orderBy';
import {
  Product,
  ProductSortOption,
  ProductFilterState
} from '#src/types/types';

type Action =
  | {
      type: 'added';
      payload: Product[];
    }
  | {
      type: 'sorted';
      payload: {
        sortOption: ProductSortOption;
      };
    }
  | {
      type: 'filtered';
      payload: {
        filter: Partial<ProductFilterState>;
      }
    };

interface ProductContextType {
  state: {
    products: Product[] | [];
    sortOption: ProductSortOption;
    filter: ProductFilterState;
  };
  dispatch: React.Dispatch<Action>;
}

const ProductContext = createContext<ProductContextType | null>(null);

const productReducer = (state: ProductContextType['state'], action: Action): ProductContextType['state']=> {
  switch (action.type) {
    case 'added': {
      return state;
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
          sortedProducts = orderBy(
            state.products,
            ['price'],
            ['desc']
          );
          break;
        case 'ratingAsc':
          sortedProducts = orderBy(
            state.products,
            ['rating'],
            ['asc']
          );
          break;
        case 'ratingDesc':
          sortedProducts = orderBy(
            state.products,
            ['rating'],
            ['desc']
          );
          break;
        default: {
          const _exhaustiveCheck: never = action.payload.sortOption;
          return _exhaustiveCheck;
        }
      }

      console.log('sortedProducts', sortedProducts);

      // Discard lowercase titles
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mappedProducts = sortedProducts.map(({ lowerCaseTitle, ...rest }) => rest
      );

      console.log('return', {
        sortOption: action.payload.sortOption,
        products: mappedProducts
      });

      return { ...state, products: mappedProducts }
    }
    case 'filtered': {
      return state;
    }
    default: {
      throw new Error('productReducer was called with an unknown action type');
    }
  }
};

const initialState: ProductContextType['state'] = {
  products: [],
  sortOption: 'nameAsc',
  filter: {
    lowestPrice: 0,
    highestPrice: 10000,
    lowestRating: 1,
    highestRating: 5,
    instock: 'true'
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
