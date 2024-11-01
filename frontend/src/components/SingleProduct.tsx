import '#src/styles/custom.css';
import { backendAddress } from '#src/utils/config';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import productsService from '#src/services/products';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ProductsPending from '#src/components/ProductsPending';
import ProductsError from '#src/components/ProductsError';

const SingleProduct = () => {
  // Read product id from current URI
  const { id } = useParams();

  // Fetch products with Tanstack Query
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll()
  });

  if (isPending) {
    return <ProductsPending />;
  }

  if (isError) {
    return <ProductsError error={error} />;
  }

  // Filter single product from query results based on current URI
  const product = data.find((product) => product.id === id);

  if (!product) {
    return null;
  }

  console.log(product);

  const firstImage = product.imgs ? product.imgs[0] : '';

  const imageUrl = `${backendAddress}${firstImage}`;

  return (
    <Container>
      <Row>
        <Col>
          <Image src={imageUrl} fluid />
        </Col>
        <Col>
          <h1>{product.title}</h1>
          <p style={{ fontSize: '2.5rem', color: 'coral' }}>{product.price}</p>
          {product.specs.map((spec, index) => (
            <p key={index}>{spec}</p>
          ))}
          <Button className="navbar-button">
            Add to cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProduct;
