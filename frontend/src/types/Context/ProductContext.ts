import { Product, ProductSortOption, ProductFilterState } from '#src/types';

export type ProductContextAction =
  | {
      type: 'added';
      payload: Product[];
    }
  | {
      type: 'reinitializedProducts';
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
      type: 'toggledFilterShouldInitialize';
      payload: {
        value: boolean;
      };
    };

export interface ProductContextType {
  state: {
    products: Product[] | [];
    sortOption: ProductSortOption;
    filter: ProductFilterState;
    filterShouldInitialize: boolean;
  };
  dispatch: React.Dispatch<ProductContextAction>;
}
