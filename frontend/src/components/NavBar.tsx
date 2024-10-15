import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState<boolean>(false)

  return (
    <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#" className="me-4 fs-4" id="navbar-brand">
          <b>RNmarket</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="fs-5">
            <Nav.Link className="text-light">Home</Nav.Link>
            <NavDropdown
              title="Products"
              id="navbar-dropdown-title"
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
              show={productsDropdownOpen}
            >
              <NavDropdown.Item className="text-light">
                Mobile phones
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-light">
                Furniture
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-light">
                Laptops
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="mx-auto" style={{ width: '600px' }}>
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
          <Nav.Link className="text-light fs-5 me-4">
            Admin <i className="bi bi-gear"></i>
          </Nav.Link>
          <Button variant="light">
            Login <i className="bi bi-box-arrow-in-right"></i>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar