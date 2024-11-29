import { useState } from "react";
import useAuth from "#src/hooks/useAuth.ts";
import { Formik } from "formik";
import * as yup from 'yup';

import Dropdown from "react-bootstrap/Dropdown"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import CloseButton from "react-bootstrap/CloseButton"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import RegisterMenu from "./RegisterMenu";

import { LoginCredentials } from "#src/types/types.ts";


const LoginMenu = () => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState<boolean>(false);

  const [showRegisterMenu, setShowRegisterMenu] = useState<boolean>(false);

  const { login } = useAuth();

  const handleLogin = (credentials: LoginCredentials) => {
    login.mutate(credentials);
  };

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .email('Enter a valid email address')
      .required('Enter a valid email address'),
    password: yup.string().required('Password must not be empty')
  });

  return (
    <>
      <Dropdown
        align='end'
        show={loginDropdownOpen}
        onToggle={() => {
          console.log('toggle');
          setLoginDropdownOpen(!loginDropdownOpen);
          setShowRegisterMenu(false);
        }}
      >
        <Dropdown.Toggle className="custom-button">
          Login <i className="bi bi-box-arrow-in-right ms-2"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-2">
          <Container className="d-flex">
            <Col></Col>
            <Row className="d-flex justify-content-center mt-1">
              {showRegisterMenu ? <h4>Register new user</h4> : <h4>Login</h4>}
            </Row>
            <Col className="d-flex justify-content-end me-2 mt-2">
              <CloseButton
                onClick={() => {
                  setLoginDropdownOpen(false);
                  setShowRegisterMenu(false);
                }}
              />
            </Col>
          </Container>
          {showRegisterMenu ? (
            <RegisterMenu setLoginDropdownOpen={setLoginDropdownOpen} />
          ) : (
            <Formik
              validationSchema={formSchema}
              onSubmit={(values) => handleLogin(values)}
              initialValues={{
                username: '',
                password: ''
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  className="d-flex flex-column ps-3 pe-3 mt-3"
                >
                  <Form.Group controlId="loginform">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                        className="navbar-loginform-form-control"
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                      <Form.Label className="mt-3">Password</Form.Label>
                    </InputGroup>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                        className="navbar-loginform-form-control"
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Container>
                      <Row>
                        <Button
                          type="submit"
                          className="custom-button mt-4 mb-2"
                        >
                          Send
                        </Button>
                      </Row>
                    </Container>
                  </Form.Group>
                  <a
                    onClick={() => setShowRegisterMenu(true)}
                    className="text-center m-1"
                  >
                    Register
                  </a>
                </Form>
              )}
            </Formik>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LoginMenu