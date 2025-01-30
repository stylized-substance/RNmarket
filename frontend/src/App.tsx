import '#src/styles/custom.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from '#src/hooks/useAuth';
import { useToast } from '#src/context/ToastContext';
import SortOptionContextProvider from '#src/context/ProductSortOptionContext';
import ProductFilterContextProvider from '#src/context/ProductFilterContext';

import Home from '#src/components/Home';
import NavBar from '#src/components/Navbar/index.tsx';
import Products from '#src/components/Products/index.tsx';
import SingleProduct from '#src/components/Products/SingleProduct.tsx';
import Cart from '#src/components/Cart/index.tsx';
import Checkout from '#src/components/Checkout';

import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';
import { Row } from 'react-bootstrap';

const App = () => {
  // Read logged on user data from localStorage
  const { loggedOnUser } = useAuth();

  // Import toast notification state
  const { toastState } = useToast();

  return (
    <>
      <Container id="app-container">
        <Row className="justify-content-center">
          <Toast
            show={toastState.show}
            animation={true}
            bg="dark"
            className="toast-notification text-center"
          >
            <Toast.Body className="toast-notification-body">
              {toastState.message}
            </Toast.Body>
          </Toast>
        </Row>
        <BrowserRouter>
          <NavBar loggedOnUser={loggedOnUser} />
          <SortOptionContextProvider>
            <ProductFilterContextProvider>
              <Routes>
                <Route path="/" element={<Products />} />
                <Route
                  path="/products/mobiles"
                  element={<Products productCategory="Mobiles" />}
                />
                <Route
                  path="/products/furniture"
                  element={<Products productCategory="Furniture" />}
                />
                <Route
                  path="/products/laptops"
                  element={<Products productCategory="Laptops" />}
                />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route
                  path="/search/:searchTerm"
                  element={<Products isSearchResults={true} />}
                />
                <Route path="/admin" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="checkout"
                  element={<Checkout loggedOnUser={loggedOnUser} />}
                />
              </Routes>
            </ProductFilterContextProvider>
          </SortOptionContextProvider>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
