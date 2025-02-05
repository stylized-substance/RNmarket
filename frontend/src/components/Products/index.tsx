import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useProducts } from '#src/context/ProductContext.tsx';

import productsService from '#src/services/products';
import { isString } from '#src/utils/typeNarrowers';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCards from '#src/components/Products/ProductCards';
import ProductsPending from '#src/components/Products/ProductsPending';
import ProductsError from '#src/components/Products/ProductsError';
import ProductSortDropdown from '#src/components/Products/ProductSortDropdown';
import ProductFilter from '#src/components/Products/ProductFilter';

import { isProductCategory } from '#src/utils/typeNarrowers';
import { ProductQuery } from '#src/types/types';

interface ProductsProps {
  productCategory?: string;
  isSearchResults?: boolean;
}

const Products = (props: ProductsProps) => {
  const productContext = useProducts();
  const dispatchRef = useRef(productContext.dispatch);

  useEffect(() => {
    // A ref is used to allow automatic product filter reset on product category change without causing a render loop
    dispatchRef.current({ type: 'filterReset' });
  }, [props.productCategory]);

  // Read product search term from current URI
  const { searchTerm } = useParams();

  // Fetch products with Tanstack Query
  let productQuery: ProductQuery = {};

  if (props.isSearchResults && isString(searchTerm)) {
    productQuery = {
      searchTerm: searchTerm
    };
  }

  if (props.productCategory && isProductCategory(props.productCategory)) {
    productQuery = {
      productCategory: props.productCategory
    };
  }

  productQuery.filter = productContext.state.filter;

  // Refetch query when product filter, category or search term changes
  const { isPending, isError, error } = useQuery({
    queryKey: ['products', productQuery],
    queryFn: async () => {
      const productsFromBackend = await productsService.getAll(productQuery);
      productContext.dispatch({
        type: 'added',
        payload: productsFromBackend
      });

      return productsFromBackend;
    }
  });

  return (
    <>
      <Col>
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
      </Col>
      <Row>
        <Col lg={2}>
          <h4>{productContext.state.products.length} products</h4>
        </Col>
        <Col>
          <ProductSortDropdown />
        </Col>
      </Row>
      <Row>
        <Col lg={2}>
          <ProductFilter />
        </Col>
        <Col lg={10}>
          {isPending && <ProductsPending />}
          {isError && <ProductsError error={error} />}
          {productContext.state.products && (
            <ProductCards products={productContext.state.products} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Products;
