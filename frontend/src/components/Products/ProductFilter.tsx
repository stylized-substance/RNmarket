import { useProducts } from '#src/context/ProductContext.tsx';
import { useQueryClient } from '@tanstack/react-query';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';

import { Formik } from 'formik';
import * as yup from 'yup';

import { ProductFilterState } from '#src/types/types.ts';

const ProductFilter = () => {
  const productContext = useProducts();
  const queryClient = useQueryClient();

  const handleSubmit = async (formValues: ProductFilterState) => {
    productContext.dispatch({
      type: 'filtered',
      payload: {
        filter: formValues
      }
    });
    await queryClient.invalidateQueries({ queryKey: ['products'] })
  };

  //TODO: Change URL to value corresponding to the API request that was made

  const formSchema = yup.object().shape({
    lowestPrice: yup.number().required().min(0),
    highestPrice: yup.number().required().max(10000),
    lowestRating: yup.number().required().min(1),
    highestRating: yup.number().required().max(5),
    instock: yup.boolean().required()
  });

  return (
    <>
      <h4>Filter products</h4>
      <Formik<ProductFilterState>
        validationSchema={formSchema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{
          lowestPrice: 0,
          highestPrice: 10000,
          lowestRating: 1,
          highestRating: 5,
          instock: true
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack gap={3}>
              <Form.Group>
                <Form.Label>
                  <b>Lowest price</b>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="lowestPrice"
                    value={values.lowestPrice}
                    onChange={handleChange}
                    isInvalid={touched.lowestPrice && !!errors.lowestPrice}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.lowestPrice}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Highest price</b>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="highestPrice"
                    value={values.highestPrice}
                    onChange={handleChange}
                    isInvalid={touched.highestPrice && !!errors.highestPrice}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.highestPrice}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Lowest rating</b>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="lowestRating"
                    value={values.lowestRating}
                    onChange={handleChange}
                    isInvalid={touched.lowestRating && !!errors.lowestRating}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.lowestRating}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Highest rating</b>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    name="highestRating"
                    value={values.highestRating}
                    onChange={handleChange}
                    isInvalid={touched.highestRating && !!errors.highestRating}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.highestRating}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
                <b>In stock items</b>
                <InputGroup>
                  <Form.Check
                    type="switch"
                    name="instock"
                    id="instock-switch"
                    checked={values.instock}
                    onChange={() => {
                      void setFieldValue('instock', !values.instock);
                    }}
                  />
                </InputGroup>
              </Form.Group>
              <Button type="submit" className="custom-button">
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductFilter;
