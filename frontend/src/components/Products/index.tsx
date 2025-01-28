import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useSortOption } from '#src/context/ProductSortOptionContext.tsx';

import productsService from '#src/services/products';
import { isString } from '#src/utils/typeNarrowers';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCards from '#src/components/Products/ProductCards.tsx';
import ProductsPending from '#src/components/Products/ProductsPending.tsx';
import ProductsError from '#src/components/Products/ProductsError.tsx';
import ProductSortDropdown from '#src/components/Products/ProductSortDropdown.tsx';

import orderBy from 'lodash/orderBy';

import { Product, ProductSortOption } from '#src/types/types.ts';

interface ProductsProps {
  productCategory?: string;
  isSearchResults?: boolean;
}

const Products = (props: ProductsProps) => {
  const { sortOption } = useSortOption();

  const sortProducts = (
    products: Product[],
    sortOption: ProductSortOption
  ): Product[] | [] => {
    if (!products || products.length === 0) {
      return [];
    }

    // Convert titles to lowercase so sorting works properly
    const lowerCaseProducts = products.map((prod) => ({
      ...prod,
      lowerCaseTitle: prod.title.toLowerCase()
    }));

    let sortedProducts;
    switch (sortOption) {
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
        sortedProducts = orderBy(products, ['price'], ['asc']);
        break;
      case 'priceDesc':
        sortedProducts = orderBy(products, ['price'], ['desc']);
        break;
      case 'ratingAsc':
        sortedProducts = orderBy(products, ['rating'], ['asc']);
        break;
      case 'ratingDesc':
        sortedProducts = orderBy(products, ['rating'], ['desc']);
        break;
      default: {
        const _exhaustiveCheck: never = sortOption;
        return _exhaustiveCheck;
      }
    }

    // Discard lowercase titles
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return sortedProducts.map(({ lowerCaseTitle, ...rest }) => rest);
  };

  // Read product search term from current URI
  const { searchTerm } = useParams();

  // Fetch products with Tanstack Query
  let productFilter = {};

  if (props.isSearchResults && isString(searchTerm)) {
    productFilter = {
      searchTerm: searchTerm
    };
  }

  if (props.productCategory && isString(props.productCategory)) {
    productFilter = {
      productCategory: props.productCategory
    };
  }

  // Refetch query when product filter or sort option changes
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products', productFilter, sortOption],
    queryFn: async () => {
      const products = await productsService.getAll(productFilter);
      if (products) {
        return sortProducts(products, sortOption);
      }
    }
  });

  if (isPending) {
    return <ProductsPending />;
  }

  if (isError) {
    return <ProductsError error={error} />;
  }

  return (
    <Container>
      <Row>
        <Col>
          {props.isSearchResults ? (
            <h1 className="text-center m-4">
              Search results for: {searchTerm}
            </h1>
          ) : (
            <h1 style={{ marginBottom: 100 }} className="text-center">
              {props.productCategory}
            </h1>
          )}
        </Col>
      </Row>
      <ProductSortDropdown />
      {data && <ProductCards products={data} />}
    </Container>
  );
};

export default Products;
