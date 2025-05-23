import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '#src/context/ProductContext.tsx';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import { Formik, FormikErrors } from 'formik';
import * as yup from 'yup';

import { ProductFilterState } from '#src/types';
import { parseNumber } from '#src/utils/typeNarrowers';

const ProductFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productContext = useProducts();
  const highestPrice = productContext.state.filter.highestPrice ?? 0;

  const handleSubmit = (formValues: ProductFilterState) => {
    // Don't add 'instock' to query if it is false
    const { instock, ...rest } = formValues;
    const queryObject = instock === false ? rest : formValues;
    // Construct URL query string from form values
    const query = `?${Object.entries(queryObject)
      .map((entry) => `${entry[0]}=${entry[1]}`)
      .join('&')}`;

    // Update product filter state
    productContext.dispatch({
      type: 'filtered',
      payload: {
        filter: formValues
      }
    });

    navigate(`${location.pathname}${query}`);
  };

  // Reset product filter state by navigating to product category page
  const handleReset = () => {
    navigate(`${location.pathname}`);
    productContext.dispatch({
      type: 'toggledFilterShouldInitialize',
      payload: {
        value: true
      }
    });
  };

  // Custom handleChange function for Formik. Prevents lowest number input going higher than highest input and vice versa. Used for lowest/highest price/rating inputs.
  const customHandleChange =
    (
      formikHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
      setFieldValue: (
        field: string,
        value: ProductFilterState[keyof ProductFilterState],
        shouldValidate?: boolean
      ) => Promise<void | FormikErrors<ProductFilterState>>,
      values: ProductFilterState
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formikHandleChange(e);
      const { name, value } = e.target;
      console.log(name, value)
      const parsedValue = parseNumber(value);

      if (values.lowestPrice && values.highestPrice) {
        if (name === 'lowestPrice') {
          if (parsedValue > values.highestPrice)
            void setFieldValue('highestPrice', parsedValue, false);
        } else if (name === 'highestPrice') {
          if (parsedValue < values.lowestPrice) {
            void setFieldValue('lowestPrice', parsedValue, false);
          }
        }
      }

      if (values.lowestRating && values.highestRating) {
        if (name === 'lowestRating') {
          if (parsedValue > values.highestRating)
            void setFieldValue('highestRating', parsedValue, false);
        } else if (name === 'highestRating') {
          if (parsedValue < values.lowestRating) {
            void setFieldValue('lowestRating', parsedValue, false);
          }
        }
      }
    };

  const formSchema = yup.object().shape({
    lowestPrice: yup
      .number()
      .required()
      .min(0, 'Must be 0 or higher')
      .max(highestPrice, `Must be ${highestPrice} or lower`),
    highestPrice: yup
      .number()
      .required()
      .min(0, 'Must be 0 or higher')
      .max(highestPrice, `Must be ${highestPrice} or lower`),
    lowestRating: yup
      .number()
      .required()
      .min(1, 'Must be 1 or higher')
      .max(5, 'Must be 5 or lower'),
    highestRating: yup
      .number()
      .required()
      .min(1, 'Must be 1 or higher')
      .max(5, 'Must be 5 or lower'),
    instock: yup.boolean().required()
  });

  return (
    <>
      <h4>Filter products</h4>
      <Formik<ProductFilterState>
        validationSchema={formSchema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={productContext.state.filter}
        enableReinitialize
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
                    min={0}
                    value={values.lowestPrice}
                    onChange={customHandleChange(
                      handleChange,
                      setFieldValue,
                      values
                    )}
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
                    min={0}
                    max={highestPrice}
                    value={values.highestPrice}
                    onChange={customHandleChange(
                      handleChange,
                      setFieldValue,
                      values
                    )}
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
                    min={1}
                    max={5}
                    value={values.lowestRating}
                    onChange={customHandleChange(
                      handleChange,
                      setFieldValue,
                      values
                    )}
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
                    min={1}
                    max={5}
                    value={values.highestRating}
                    onChange={customHandleChange(
                      handleChange,
                      setFieldValue,
                      values
                    )}
                    isInvalid={touched.highestRating && !!errors.highestRating}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.highestRating}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
                <b>In stock items only</b>
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
              <Button onClick={handleReset} className="custom-button">
                Reset filter
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductFilter;
