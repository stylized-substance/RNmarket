import { padPrice } from '#src/utils/padPrice';
import { cartTotalPrice } from '#src/utils/cartTotalPrice'
import { useCart } from '#src/context/CartContext.tsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <h1 className="mb-5 mt-5">Checkout</h1>
      </Row>
      <Row className="mb-5">
        <Col>
          <h2 className="mb-5">Delivery information</h2>
          <Col className="me-5">
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
        </Col>
        <Col
          style={{ width: '40%' }}
          className="d-flex flex-column bg-light ms-4 p-3"
          lg={{ span: 2 }}
        >
          <h5 className="text-center pb-4">Ordering following items</h5>
          <Row className="text-center pb-2">
            <Col>
              <b>Product</b>
            </Col>
            <Col>
              <b>Amount</b>
            </Col>
            <Col>
              <b>Price</b>
            </Col>
          </Row>
          {cartItems.map((item) => (
            <Row
              key={item.product.id}
              className="justify-content-between text-center pb-2"
            >
              <Col>
                <div>{item.product.title}</div>
              </Col>
              <Col>
                <div>{item.quantity}</div>
              </Col>
              <Col>
                <div>{padPrice(item.product.price * item.quantity)}</div>
              </Col>
            </Row>
          ))}
          <h5 className="text-center mt-5">Total: {cartTotalPrice(cartItems)}€</h5>
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
