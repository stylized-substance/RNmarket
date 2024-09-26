import { useState, useEffect } from 'react';
import { Product } from './types/types';
import productsService from './services/products';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products: Product[] = await productsService.getAll();
      setProducts(products);
    };

    void getProducts();
  }, []);

  const productsMapped = products.map((product) => {

    let imageUrl = ''
    if (product.imgs !== null &&  product.imgs !== undefined) {
      imageUrl = `http://localhost:3003${product.imgs[0]}`
    }
    
    return (
      <>
        <div key={product.id}>
          {product.title}
          <br />
          Price: {product.price}
          <br />
          In stock: {product.instock}
          <br />
          Rating: {product.rating}
        </div>
        <img src={imageUrl}></img>
        <br />
      </>
    );
  });

  return <>{productsMapped}</>;
};

export default App;
