import { useContext } from 'react';
import ProductContext from '#src/context/ProductContext.tsx';

import { Product } from '#src/types/types';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProductCardsProps {
  products: Product[];
}

const ProductCards = (props: ProductCardsProps) => {
  const context = useContext(ProductContext);

  const productsToCards = props.products.map((product) => {
    let imageUrl = '';
    if (product.imgs !== null && product.imgs !== undefined) {
      imageUrl = `http://localhost:3003${product.imgs[0]}`;
    }

    const productTitleToUri = product.title.split(' ').join('-');

    const handleCardClick = () => {
      if (context) {
        context.productDispatch({ type: 'UPDATE', payload: 'test' });
      }
    };
    
    return (
      <a href={`/products/${productTitleToUri}`} key={product.id}>
        <Card key={product.id} onClick={handleCardClick}>
          <Card.Img
            variant="top"
            src={imageUrl}
            style={{ height: 200, width: 'auto' }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Subtitle>{product.price}</Card.Subtitle>
            <Card.Text>{product.specs[0].substring(0, 20)}</Card.Text>
          </Card.Body>
        </Card>
      </a>
    );
  });

  return (
    <Row lg={6}>
      {productsToCards.map((card) => (
        <Col key={card.key}>{card}</Col>
      ))}
    </Row>
  );
};

export default ProductCards;
