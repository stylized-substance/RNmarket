import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '#src/hooks/useAuth';
import { useCart } from '#src/context/CartContext';

import LoginMenu from '#src/components/Navbar/LoginMenu';
import RegisterMenu from '#src/components/Navbar/RegisterMenu';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import CloseButton from 'react-bootstrap/CloseButton';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { LoginPayload } from '#src/types/types';

interface NavBarProps {
  loggedOnUser: LoginPayload | null;
}

const NavBar = (props: NavBarProps) => {
  const cart = useCart();
  const cartItems = cart.state;

  const [productsDropdownOpen, setProductsDropdownOpen] =
    useState<boolean>(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState<boolean>(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSearchSubmit = () => {
    event?.preventDefault();
    setSearchTerm('');
    navigate(`/search/${searchTerm}`);
  };

  return (
    <Row style={{ marginBottom: '100px' }}>
      <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid id="navbar-container">
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
                <Dropdown
                  align="end"
                  show={loginDropdownOpen}
                  onToggle={() => {
                    setLoginDropdownOpen(!loginDropdownOpen);
                    setShowRegisterMenu(false);
                  }}
                >
                  {!props.loggedOnUser ? (
                    <Dropdown.Toggle className="custom-button">
                      Login <i className="bi bi-box-arrow-in-right ms-2"></i>
                    </Dropdown.Toggle>
                  ) : (
                    <Button onClick={logout} className="custom-button">
                      Logout <i className="bi bi-box-arrow-left ms-2"></i>
                    </Button>
                  )}

                  <Dropdown.Menu className="mt-2">
                    <Container className="d-flex">
                      <Col></Col>
                      <Row className="d-flex justify-content-center mt-1"></Row>
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
                      <RegisterMenu
                        setLoginDropdownOpen={setLoginDropdownOpen}
                      />
                    ) : (
                      <LoginMenu
                        setShowRegisterMenu={setShowRegisterMenu}
                        setLoginDropdownOpen={setLoginDropdownOpen}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
              {/* TODO: Make this a dropdown */}
                <Button
                  onClick={() => navigate('/cart')}
                  className="custom-button position-relative me-2"
                >
                  Cart <i className="bi bi-cart4 ms-2 ms-2"></i>
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cartItems.length}
                  </Badge>
                </Button>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};

export default NavBar;
