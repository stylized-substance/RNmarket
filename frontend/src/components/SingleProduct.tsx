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
    queryKey: ['singleProduct'],
    queryFn: () => {
      if (!id) {
        throw new Error('Product Id missing from URI');
      }

      return productsService.getOne(id);
    }
  });

  if (isPending) {
    return <ProductsPending />;
  }

  if (isError) {
    return <ProductsError error={error} />;
  }

  if (!data) {
    return <h1 className="text-center">Product not found</h1>;
  }

  const firstImage = data.imgs ? data.imgs[0] : '';

  const imageUrl = `${backendAddress}${firstImage}`;

  return (
    <Container>
      <Row>
        <Col>
          <Image src={imageUrl} fluid />
        </Col>
        <Col>
          <h1>{data.title}</h1>
          <p style={{ color: 'coral' }} className="fs-1">
            {data.price}
          </p>
          {data.specs.map((spec, index) => (
            <p key={index}>{spec}</p>
          ))}
          <Button size="lg" className="custom-button">
            Add to cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProduct;
