import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import productsService from '#src/services/products';
import { isString } from '#src/utils/typeNarrowers';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCards from '#src/components/ProductCards';
import ProductsPending from '#src/components/ProductsPending';
import ProductsError from '#src/components/ProductsError';

interface ProductsProps {
  productCategory?: string;
  isSearchResults?: boolean;
}

const Products = (props: ProductsProps) => {
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

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products', productFilter],
    queryFn: () => productsService.getAll(productFilter)
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
            <h1 className="text-center m-4">{props.productCategory}</h1>
          )}
        </Col>
      </Row>
      <ProductCards products={data} />
    </Container>
  );
};

export default Products;
