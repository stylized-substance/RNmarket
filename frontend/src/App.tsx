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
    let imageUrl = '';
    if (product.imgs !== null && product.imgs !== undefined) {
      imageUrl = `http://localhost:3003${product.imgs[0]}`;
    }

    return (
      <div key={product.id} className="product-card">
        <div className="product-image">
          <img src={imageUrl}></img>
        </div>
        <div  className="product-info">
          <h5>
            {product.title}
          </h5>
          <h6>
            Price: {product.price}
          </h6>
        </div>
      </div>
    );
  });

  return (
    <div className="product-container">
      <h1>
        All products
      </h1>
      {productsMapped}
    </div>
  )
};

export default App;
