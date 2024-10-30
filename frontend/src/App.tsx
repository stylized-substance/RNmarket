import '#src/styles/custom.css';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useContext } from 'react';
import ProductContext from '#src/context/ProductContext.tsx';


import Home from '#src/components/Home';
import NavBar from '#src/components/NavBar';
import Products from '#src/components/Products';
import SingleProduct from '#src/components/SingleProduct';
import { ProductContextProvider } from '#src/context/ProductContext';

import Container from 'react-bootstrap/Container';

const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState<boolean>(true);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  const context = useContext(ProductContext)
  console.log('context', context)
  if (context) {
    // const id = context.id

  }

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
      <ProductContextProvider>
        <Routes>
          <Route path="/" element=<Home /> />
          <Route
            path="/products/mobiles"
            element=<Products productCategory="Mobiles" />
          />
          <Route
            path="/products/furniture"
            element=<Products productCategory="Furniture" />
          />
          <Route
            path="/products/laptops"
            element=<Products productCategory="Laptops" />
          />
          <Route
            path="/products/:product-title"
            element=<SingleProduct />
          ></Route>
          <Route
            path="/search/:searchTerm"
            element=<Products isSearchResults={true} />
          />
          <Route path="/admin" element=<Home /> />
          <Route path="/cart" element=<Home /> />
        </Routes>
      </ProductContextProvider>
    </BrowserRouter>
  );
};

export default App;
