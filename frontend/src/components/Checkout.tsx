import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Formik } from 'formik';
import * as yup from 'yup';

import countries from '../../data/countries.json'

interface CheckoutFormValues {
  firstname: string;
  lastname: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

const Checkout = () => {
  const handleSubmit = (formValues: CheckoutFormValues) => {
    console.log(formValues);
  };

  const formSchema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    address: yup.string().required(),
    zipcode: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required()
  });

  return (
    <Col>
      <Row className="mb-5">
        <h1>Checkout</h1>
      </Row>
      <Row>
        <h2>Delivery information</h2>
      </Row>
      <Formik<CheckoutFormValues>
        validationSchema={formSchema}
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{
          firstname: '',
          lastname: '',
          address: '',
          zipcode: '',
          city: '',
          country: ''
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  isInvalid={touched.firstname && !!errors.firstname}
                  className="mb-3"
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  isInvalid={touched.lastname && !!errors.lastname}
                  className="mb-3"
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Street address</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isInvalid={touched.address && !!errors.address}
                  className="mb-3"
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>ZIP code</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  isInvalid={touched.zipcode && !!errors.zipcode}
                  className="mb-3"
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={touched.city && !!errors.city}
                  className="mb-3"
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            {/* TODO: Add country dropdown*/}
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <InputGroup>
              <Form.Select>
                {countries.map((country) => (
                  <option key={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
                {/* <Form.Control
                  type="text"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  isInvalid={touched.country && !!errors.country}
                  className="mb-3"
                ></Form.Control> */}
              </InputGroup>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default Checkout;
