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


interface ProductsProps {
  productCategory?: string;
  isSearchResults?: boolean;
}

const Products = (props: ProductsProps) => {
  const productContext = useProducts();
  console.log(productContext.state)

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
  const { isPending, isError, error } = useQuery({
    queryKey: ['products', productFilter],
    queryFn: async () => {
      const productsFromBackend = await productsService.getAll(productFilter);
      productContext.dispatch({
        type: 'added',
        payload: productsFromBackend
      })

      return productsFromBackend
    },
      // if (products) {
      //   const { sortOption, products } = productSort.dispatch({
      //     type: 'modified',
      //     payload: {
      //       sortOption: productSort.state.sortOption,
      //       products: products
      //     }
      //   })
      //   console.log('sortedProducts', sortedProducts)
      //   return sortedProducts
      // }
  });
  

  if (isPending) {
    return <ProductsPending />;
  }

  if (isError) {
    return <ProductsError error={error} />;
  }
  
  return (
    <>
      <Col>
        <Row>
          <Col>
            {props.isSearchResults ? (
              )}
              <h1 className="text-center m-4">
                Search results for: {searchTerm}
              </h1>
            ) : (
              <h1 style={{ marginBottom: 100 }} className="text-center">
                {props.productCategory}
              </h1>
          </Col>
        </Row>
      </Col>
      <ProductSortDropdown />
      <Row>
        <Col lg={2}>
          <ProductFilter />
        </Col>
        <Col lg={10}>{productContext.state.products && <ProductCards products={productContext.state.products} />}</Col>
      </Row>
    </>
  );
};

export default Products;
