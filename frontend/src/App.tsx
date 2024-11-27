import '#src/styles/custom.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from '#src/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

import Home from '#src/components/Home';
import NavBar from '#src/components/NavBar';
import Products from '#src/components/Products';
import SingleProduct from '#src/components/SingleProduct';

import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';

const App = () => {
  // TODO: Implement user registrations

  // Read logged on user data from localStorage
  const { loggedOnUser } = useAuth();

  // Store placeholder toast notification state in Tanstack Query cache
  const { data: toastState } = useQuery({
    queryKey: ['toastState'],
    initialData: {
      message: '',
      show: false
    }
  });

  return (
    <Container className="d-flex flex-column">
      <Toast
        show={toastState.show}
        animation={true}
        delay={5000}
        autohide
        bg='dark'
        className="align-self-center toast-notification"
      >
        <Toast.Body className="toast-notification-body">
          {toastState.message}
        </Toast.Body>
      </Toast>

      <BrowserRouter>
        <Container style={{ marginBottom: '100px' }}>
          <NavBar loggedOnUser={loggedOnUser ?? null} />
        </Container>
        <Container>
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
            <Route path="/cart" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Container>
  );
};

export default App;
