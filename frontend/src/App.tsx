import '#src/styles/custom.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '#src/components/Home';
import NavBar from '#src/components/NavBar';
import Products from '#src/components/Products';

import Container from 'react-bootstrap/Container';

const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);


  return (
    <BrowserRouter>
      <Container style={{ marginBottom: '60px' }}>
        <NavBar
          adminLoggedIn={adminLoggedIn}
          setAdminLoggedIn={setAdminLoggedIn}
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
        />
      </Container>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/mobiles" element=<Products productCategory="Mobiles" /> />
        <Route
          path="/furniture"
          element=<Products productCategory="Furniture" />
        />
        <Route path="/laptops" element=<Products productCategory="Laptops" /> />
        <Route path="/admin" element=<Home /> />
        <Route path="/cart" element=<Home /> />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
