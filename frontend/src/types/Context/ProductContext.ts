import { Product, ProductSortOption, ProductFilterState } from '#src/types';

export type ProductContextAction =
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
        filter: ProductFilterState;
      };
    }
  | {
      type: 'filterReset';
    };

export interface ProductContextType {
  state: {
    products: Product[] | [];
    sortOption: ProductSortOption;
    filter: ProductFilterState;
  };
  dispatch: React.Dispatch<ProductContextAction>;
}
