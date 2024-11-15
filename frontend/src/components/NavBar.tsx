import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import authorizationService from '#src/services/authorization.ts';

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
import { LoginCredentials } from '#src/types/types.ts';

interface NavBarProps {
  adminLoggedIn: boolean;
  setAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginMenu = () => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  
  // Login using Tanstack Query
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return authorizationService.login(credentials)
    },
    {
      onSuccess: (data, variables, context) => {
        console.log(data, variables, context)
        // Save user data to cache
        // queryClient.setQueryData('user', payload)
      }
    }
  })

  const handleLogin = (credentials: LoginCredentials) => {
    event?.preventDefault()
    loginMutation.mutate(credentials)
  }
  

  return (
    <>
      <Dropdown
        align="end"
        show={loginDropdownOpen}
        onToggle={() => setLoginDropdownOpen(!loginDropdownOpen)}
      >
        <Button
          onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
          className="custom-button"
        >
          Login <i className="bi bi-box-arrow-in-right ms-2"></i>
        </Button>
        <Dropdown.Menu className="mt-2">
          <Container>
            <Row className="justify-content-end me-2 mt-2">
              <CloseButton onClick={() => setLoginDropdownOpen(false)} />
            </Row>
          </Container>
          <Form onSubmit={() => handleLogin()} className="d-flex flex-column ps-3 pe-3 mt-3">
            <Form.Group controlId="loginform">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                className="navbar-loginform-form-control"
              ></Form.Control>
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                className="navbar-loginform-form-control"
              ></Form.Control>
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
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const NavBar = (props: NavBarProps) => {
  const [productsDropdownOpen, setProductsDropdownOpen] =
    useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('')

  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    event?.preventDefault()
    setSearchTerm('')
    navigate(`/search/${searchTerm}`)
  }

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
            {props.adminLoggedIn && (
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
              {!props.userLoggedIn ? (
                <LoginMenu />
              ) : (
                <Button className="custom-button">
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
