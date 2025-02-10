import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
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
import { useEffect, useRef } from 'react';
interface ProductsProps {
  productCategory?: string;
  isSearchResults?: boolean;
}

const Products = (props: ProductsProps) => {
  const productContext = useProducts();
  const dispatchRef = useRef(productContext.dispatch);

  // Read product search term from current URI and parse if rendering product search results
  let { searchTerm } = useParams();
  searchTerm =
    props.isSearchResults && searchTerm && isString(searchTerm)
      ? searchTerm
      : undefined;
  
  useEffect(() => {
    // Reset product filter form state when product category or search term changes
    // A ref is used to prevent a render loop while having necessary functions as useEffect dependencies
    dispatchRef.current({ type: 'filterReset' });
  }, [props.productCategory, searchTerm]);

  // Fetch products with Tanstack Query
  const productCategory =
    props.productCategory && isProductCategory(props.productCategory)
      ? props.productCategory
      : undefined;

  const productQuery = useLocation().search.substring(1);

  // Refetch query when product search term, category or filter query changes
  const { isPending, isError, error } = useQuery({
    queryKey: ['products', searchTerm, productCategory, productQuery],
    queryFn: async () => {
      const productsFromBackend = await productsService.getAll({
        searchTerm,
        productCategory,
        productQuery
      });
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
        <Row className="m-4">
          {props.isSearchResults ? (
            <h1 className="text-center">Search results for: {searchTerm}</h1>
          ) : (
            <h1 className="text-center">{props.productCategory}</h1>
          )}
        </Row>
      </Col>
      <Row>
        <Col lg={2}>
          <h5>{productContext.state.products.length} products</h5>
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
