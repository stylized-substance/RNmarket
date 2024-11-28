import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuth from '#src/hooks/useAuth';
import useToast from '#src/hooks/useToast';
import usersService from '#src/services/users';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import { Formik } from 'formik';
import * as yup from 'yup';

import { LoginCredentials, LoginPayload, NewUser } from '#src/types/types.ts';

interface NavBarProps {
  loggedOnUser: LoginPayload | null;
}

interface RegisterMenuProps {
  setLoginDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterMenu = ({ setLoginDropdownOpen }: RegisterMenuProps) => {
  const { toastMutation } = useToast();

  // Register a new user account
  const register = useMutation({
    mutationFn: (userData: NewUser) => {
      return usersService.register(userData);
    },
    onSuccess: () => {
      setLoginDropdownOpen(false)
      toastMutation.mutate({
        message: 'New user created. You can now log in',
        show: true
      })
    },
    onError: (error) => {
      toastMutation.mutate({
        message: error.message,
        show: true
      });
    }
  });

  const handleRegister = (userData: NewUser) => {
    register.mutate(userData);
  };

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .email('Enter a valid email address')
      .required('Enter a valid email address'),
    name: yup.string().required(),
    password: yup.string().required(),
    isadmin: yup.boolean().required()
  });

  return (
    <>
      <Formik
        validationSchema={formSchema}
        onSubmit={(values) => handleRegister(values)}
        initialValues={{
          username: '',
          name: '',
          password: '',
          isadmin: false
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="d-flex flex-column ps-3 pe-3 mt-3"
          >
            <Form.Group controlId="registerform">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Enter username (must be an email address)"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={touched.username && !!errors.username}
                  className="navbar-loginform-form-control"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Label className="mt-3">Full name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.username && !!errors.name}
                  className="navbar-loginform-form-control"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Label className="mt-3">Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
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
                  <Button type="submit" className="custom-button mt-4 mb-2">
                    Send
                  </Button>
                </Row>
              </Container>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </>
  );
};

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

const NavBar = (props: NavBarProps) => {
  const [productsDropdownOpen, setProductsDropdownOpen] =
    useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleSearchSubmit = () => {
    event?.preventDefault();
    setSearchTerm('');
    navigate(`/search/${searchTerm}`);
  };

  return (
    <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand
          as="span"
          style={{ cursor: 'pointer' }}
          id="navbar-brand"
          onClick={() => navigate('/')}
          className="me-4 fs-4"
        >
          <b>RNmarket</b>
        </Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="fs-5">
            <Nav.Link onClick={() => navigate('/')} className="text-light">
              Home
            </Nav.Link>
            <NavDropdown
              title="Products"
              id="navbar-dropdown-title"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
              show={productsDropdownOpen}
            >
              <NavDropdown.Item
                onClick={() => navigate('/products/mobiles')}
                className="text-light"
              >
                Mobile phones
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => navigate('/products/furniture')}
                className="text-light"
              >
                Furniture
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => navigate('/products/laptops')}
                className="text-light"
              >
                Laptops
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form style={{ width: '600px' }} onSubmit={handleSearchSubmit}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="border-0 bg-light navbar-search-placeholder"
              />
              <Button type="submit" className="custom-button">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <Row>
            {props.loggedOnUser && props.loggedOnUser.isadmin && (
              <Col>
                <Button
                  onClick={() => navigate('/admin')}
                  className="custom-button"
                >
                  Admin <i className="bi bi-gear ms-2"></i>
                </Button>
              </Col>
            )}
            <Col>
              {!props.loggedOnUser ? (
                <LoginMenu />
              ) : (
                <Button onClick={logout} className="custom-button">
                  Logout <i className="bi bi-box-arrow-left ms-2"></i>
                </Button>
              )}
            </Col>
            <Col>
              <Button
                onClick={() => navigate('/cart')}
                className="custom-button"
              >
                Cart <i className="bi bi-cart4 ms-2"></i>
              </Button>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
