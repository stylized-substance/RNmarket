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
        products: Product[];
        sortOption: ProductSortOption;
      };
    }
  | {
      type: 'filtered';
      payload: Partial<ProductFilterState>;
    };

interface ProductContextType {
  state: {
    products: Product[] | [];
    sortOption: ProductSortOption;
    filter: Partial<ProductFilterState>;
  };
  dispatch: React.Dispatch<Action>;
}

const ProductContext = createContext<ProductContextType | null>(null);

const productReducer = (state: ProductContextType['state'], action: Action): ProductContextType['state']['products'] => {
  switch (action.type) {
    case 'added': {
      return action.payload;
    }
    case 'sorted': {
      //return orderBy(action.payload.products, ['price'], [action.payload.sortOption]);

      if (!action.payload.products || action.payload.products.length === 0) {
        return [];
      }

      // Temporarily add lowercase titles to products so orderBy function works properly
      const lowerCaseProducts = action.payload.products.map((prod) => ({
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
          sortedProducts = orderBy(action.payload.products, ['price'], ['asc']);
          break;
        case 'priceDesc':
          sortedProducts = orderBy(
            action.payload.products,
            ['price'],
            ['desc']
          );
          break;
        case 'ratingAsc':
          sortedProducts = orderBy(
            action.payload.products,
            ['rating'],
            ['asc']
          );
          break;
        case 'ratingDesc':
          sortedProducts = orderBy(
            action.payload.products,
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

      return mappedProducts;
    }
    case 'filtered': {
      return [];
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
    highestRating: 5
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
