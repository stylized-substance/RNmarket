import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { useProducts } from '#src/context/ProductContext.tsx';

import productsService from '#src/services/products';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCards from '#src/components/Products/ProductCards';
import ProductsPending from '#src/components/Products/ProductsPending';
import ProductsError from '#src/components/Products/ProductsError';
import ProductSortDropdown from '#src/components/Products/ProductSortDropdown';
import ProductFilter from '#src/components/Products/ProductFilter/index.tsx';

import { isProductCategory } from '#src/utils/typeNarrowers';
import { getFilterValues } from '#src/utils/getFilterValues';
import { useEffect, useRef } from 'react';

const Products = ({ productCategory }: { productCategory?: string }) => {
  const productContext = useProducts();
  const dispatchRef = useRef(productContext.dispatch);
  const initialLoad = useRef(true);
  const previousCategory = useRef(productCategory);

  // Parse search term and product filter query from URL
  const [searchTerm] = new URLSearchParams(useLocation().search).getAll(
    'search'
  );
  const urlFilter = useLocation().search.substring(1);

  // Parse current product category
  const parsedProductCategory =
    productCategory && isProductCategory(productCategory)
      ? productCategory
      : undefined;

  // Fetch products with Tanstack Query
  // Refetch query when product search term, category or filter query changes
  const filterQuery = searchTerm ? undefined : urlFilter;
  const {
    data: productsFromBackend,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ['products', searchTerm, productCategory, filterQuery],
    queryFn: async () => {
      const products = await productsService.getAll({
        searchTerm,
        parsedProductCategory,
        filterQuery
      });

      return products;
    }
  });

  // Reset product state when products refetch
  useEffect(() => {
    dispatchRef.current({
      type: 'reinitializedProducts'
    });
  }, [productsFromBackend]);

  // Save products to context and set initial product filter values based on properties of products
  // Using productContext.dispatch here would require having the context as a dependency for useEffect, thus causing a render loop. A ref is used instead.
  useEffect(() => {
    if (productsFromBackend && productsFromBackend.length > 0) {
      dispatchRef.current({
        type: 'added',
        payload: productsFromBackend
      });

      // Trigger product filter reset on initial page load and when 'Reset filter' button is pressed
      if (
        initialLoad.current === true ||
        productContext.state.filterShouldInitialize === true
      ) {
        dispatchRef.current({
          type: 'filtered',
          payload: {
            filter: {
              ...getFilterValues(productsFromBackend),
              instock: false // Show all products, including those not in stock
            }
          }
        });

        dispatchRef.current({
          type: 'toggledFilterShouldInitialize',
          payload: {
            value: false
          }
        });

        initialLoad.current = false;
      }
    }
  }, [productsFromBackend, productContext.state.filterShouldInitialize]);

  // Trigger product filter reset when product category changes
  useEffect(() => {
    if (previousCategory.current !== productCategory) {
      dispatchRef.current({
        type: 'toggledFilterShouldInitialize',
        payload: {
          value: true
        }
      });

      previousCategory.current = productCategory;
    }
  }, [productCategory]);

  return (
    <Col id="products-page">
      <Col className="flex-grow-0 mt-5">
        <Row className="m-4">
          {searchTerm ? (
            <h1 className="text-center">Search results for: {searchTerm}</h1>
          ) : (
            <h1 className="text-center">
              {productCategory === 'Mobiles'
                ? 'Mobile phones'
                : productCategory}
            </h1>
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
    </Col>
  );
};

export default Products;
