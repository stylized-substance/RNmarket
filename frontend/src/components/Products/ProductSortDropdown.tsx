import { useProducts } from '#src/context/ProductContext.tsx';

import { Formik } from 'formik';
import { Row, Form } from 'react-bootstrap';

import { isProductSortOption } from '#src/utils/typeNarrowers.ts';
import { ProductSortOption } from '#src/types/types.ts';

interface ProductSortDropdownValue {
  option: ProductSortOption;
}

const ProductSortDropdown = () => {
  const productSort  = useProductSort();
  //TODO: Change URL to value corresponding to the API request that was made
  return (
    <Row className="justify-content-end text-end">
      <b>Sort products</b>
      <Formik<ProductSortDropdownValue>
        onSubmit={() => console.log('onSubmit')}
        initialValues={{
          option: useProductSort.state.sortOption
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

export default ProductSortDropdown;
