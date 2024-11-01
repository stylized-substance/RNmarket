import '#src/styles/custom.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '#src/components/Home';
import NavBar from '#src/components/NavBar';
import Products from '#src/components/Products';
import SingleProduct from '#src/components/SingleProduct';

import Container from 'react-bootstrap/Container';

const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  return (
    <Container className="d-flex flex-column">
      <BrowserRouter>
        <Container style={{ marginBottom: '100px' }}>
          <NavBar
            adminLoggedIn={adminLoggedIn}
            setAdminLoggedIn={setAdminLoggedIn}
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
          />
        </Container>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
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
