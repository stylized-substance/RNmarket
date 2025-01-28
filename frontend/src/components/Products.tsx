import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useSortOption } from '#src/context/ProductSortOptionContext.tsx';

import productsService from '#src/services/products';
import { isString, isProductSortOption } from '#src/utils/typeNarrowers';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ProductCards from '#src/components/ProductCards';
import ProductsPending from '#src/components/ProductsPending';
import ProductsError from '#src/components/ProductsError';

import { Formik } from 'formik';
import orderBy from 'lodash/orderBy';

import { Product, ProductSortOption } from '#src/types/types.ts';

interface ProductsProps {
  productCategory?: string;
  isSearchResults?: boolean;
}

interface ProductSortDropdownValue {
  option: ProductSortOption;
}

const Products = (props: ProductsProps) => {
  const { sortOption } = useSortOption();
  console.log('sortOption', sortOption);

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

  console.log('data', data);

  if (isPending) {
    return <ProductsPending />;
  }

  if (isError) {
    return <ProductsError error={error} />;
  }

  const ProductSortDropdown = () => {
    const { sortOption, setSortOption } = useSortOption();

    return (
      <Row className="justify-content-end text-end">
        <b>Sort products</b>
        <Formik<ProductSortDropdownValue>
          onSubmit={() => console.log('onSubmit')}
          initialValues={{
            option: sortOption
          }}
        >
          {({ handleChange, values }) => (
            <Form.Select
              value={values.option}
              name="option"
              onChange={(event) => {
                if (isProductSortOption(event.target.value)) {
                  handleChange(event);
                  setSortOption(event.target.value);
                }
              }}
              className="w-25 mt-2 mb-5"
            >
              <option value="nameAsc">Name ascending</option>
              <option value="nameDesc">Name descending</option>
              <option value="priceAsc">Lowest price</option>
              <option value="priceDesc">Highest price</option>
              <option value="ratingAsc">Lowest rating</option>
              <option value="ratingDesc">Highest rating</option>
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
      <ProductSortDropdown />
      {data && <ProductCards products={data} />}
    </Container>
  );
};

export default Products;
