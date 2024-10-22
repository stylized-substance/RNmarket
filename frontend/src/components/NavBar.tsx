import { useState } from 'react';

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

interface NavBarProps {
  adminLoggedIn: boolean;
  setAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userLoggedIn: boolean;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginButton = () => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="primary"
        onMouseEnter={() => setLoginDropdownOpen(true)}
        className="navbar-button "
      >
        Login <i className="bi bi-box-arrow-in-right ms-2"></i>
      </Button>
      <Dropdown align="end" show={loginDropdownOpen}>
        <Dropdown.Menu
          className="p-3 mt-5"
          onMouseLeave={() => setLoginDropdownOpen(false)}
        >
          <Form>
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
                  <Button variant="primary" type="submit" className="mt-4">
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

  return (
    <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/" className="me-4 fs-4" id="navbar-brand">
          <b>RNmarket</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="fs-5">
            <Nav.Link href="/" className="text-light">
              Home
            </Nav.Link>
            <NavDropdown
              title="Products"
              id="navbar-dropdown-title"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
              show={productsDropdownOpen}
            >
              <NavDropdown.Item href="/mobiles" className="text-light">
                Mobile phones
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/furniture" className="text-light">
                Furniture
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/laptops" className="text-light">
                Laptops
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form style={{ width: '600px' }}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products"
                className="border-0 bg-light navbar-search-placeholder"
              />
              <Button type="submit" variant="light">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <Row>
            {props.adminLoggedIn && (
              <Col>
                <Button
                  href="/admin"
                  variant="primary"
                  className="navbar-button"
                >
                  Admin <i className="bi bi-gear ms-2"></i>
                </Button>
              </Col>
            )}
            <Col>
              {!props.userLoggedIn ? (
                <LoginButton />
              ) : (
                <Button variant="primary">
                  Logout <i className="bi bi-box-arrow-left ms-2"></i>
                </Button>
              )}
            </Col>
            <Col>
              <Button variant="primary" className="navbar-button">
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
