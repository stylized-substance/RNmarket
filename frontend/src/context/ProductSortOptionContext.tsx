import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { ProductSortOption } from '#src/types/types';

const ProductSortOptionContext = createContext<{
  sortOption: ProductSortOption;
  setSortOption: React.Dispatch<React.SetStateAction<ProductSortOption>>;
} | null>(null);

export const useSortOption = () => {
  const context = useContext(ProductSortOptionContext);

  if (!context) {
    throw new Error(
      'useSortOption must be used within a ProductSortOptionProvider'
    );
  }

  return context;
};

const SortOptionContextProvider = ({ children }: PropsWithChildren) => {
  const [sortOption, setSortOption] = useState<ProductSortOption>('nameAsc');

  return (
    <ProductSortOptionContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </ProductSortOptionContext.Provider>
  );
};

export default SortOptionContextProvider