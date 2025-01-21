import { useCart } from '#src/context/CartContext.tsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Formik } from 'formik';
import * as yup from 'yup';

// import countries from '../../data/countries.json';

interface CheckoutFormValues {
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

const Checkout = () => {
  const cart = useCart();

  const cartItems = cart.state;

  const handleSubmit = (formValues: CheckoutFormValues) => {
    console.log(formValues);
  };

  const formSchema = yup.object().shape({
    email: yup.string().email(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    address: yup.string().required(),
    zipcode: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required()
  });

  return (
    <>
      <Row className="mb-5 text-center">
        <h1>Checkout</h1>
      </Row>
      <Row className="mb-5">
        <h2>Delivery information</h2>
      </Row>
      <Row>
        <Col className="me-4">
          <Formik<CheckoutFormValues>
            validationSchema={formSchema}
            onSubmit={(values) => handleSubmit(values)}
            initialValues={{
              email: '',
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
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                      className="mb-3"
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Row>
                {/* TODO: Add country dropdown*/}
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <InputGroup>
                    <Form.Select>
                      {/* {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))} */}
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
        <Col
          style={{ width: '40%' }}
          className="bg-light ms-4 p-3"
          lg={{ span: 2 }}
        >
          <h5 className="text-center">Ordering following items</h5>
          {/*TODO: fix layout inside box*/}
          <Row className="justify-content-between">
            <Col>
              <b>Product</b>
            </Col>
            <Col>
              <b>Amount</b>
            </Col>
          </Row>
            {/* <h5 className="text-center">{cartTotalPrice}€</h5> */}
            {cartItems.map((item) => (
              <Row key={item.product.id} className="justify-content-between">
                <Col>
                  <div>{item.product.title}</div>
                </Col>
                <Col>
                  <div>{item.quantity}</div>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
