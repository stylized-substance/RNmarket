import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import productsService from '#src/services/products';
import { isString } from '#src/utils/typeNarrowers';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ProductCards from '#src/components/ProductCards';
import ProductsPending from '#src/components/ProductsPending';
import ProductsError from '#src/components/ProductsError';

import { Formik } from 'formik';
import * as yup from 'yup';

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

  const changeSorting = (value) => {
    console.log(value);
  };

  const SortProducts = () => {
    return (
      <Row className="justify-content-end text-end">
        <b>Sort products</b>
        <Formik
          onSubmit={(value) => changeSorting(value)}
          initialValues={{
            option: 'lowestPrice'
          }}
        >
          {({ handleChange, values }) => (
            <Form.Select
              value={values.option}
              name="option"
              onChange={(event) => {
                handleChange(event);
                changeSorting(event.target.value);
              }}
              className="w-25 mt-2 mb-5"
            >
              <option>Name ascending</option>
              <option>Name descending</option>
              <option>Lowest price</option>
              <option>Highest price</option>
              <option>Lowest rating</option>
              <option>Highest rating</option>
            </Form.Select>
          )}
        </Formik>
      </Row>
    );
  };

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
      <SortProducts />
      <ProductCards products={data} />
    </Container>
  );
};

export default Products;
