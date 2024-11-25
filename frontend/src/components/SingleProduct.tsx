import { backendAddress } from '#src/utils/config';
import productsService from '#src/services/products';
import { padPrice } from '#src/utils/padPrice.ts';
import { parseString } from '#src/utils/typeNarrowers';

import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import BreadCrumb from 'react-bootstrap/Breadcrumb';
import ProductsPending from '#src/components/ProductsPending';
import ProductsError from '#src/components/ProductsError';
import StarRating from '#src/components/StarRating';
import Reviews from '#src/components/Reviews';
import ReviewForm from '#src/components/ReviewForm';

const ImageCarousel = ({ images }: { images: string[] }) => {
  const imageUrls: string[] = images.map(
    (image) => `${backendAddress}${image}`
  );

  return (
    <Carousel interval={null} data-bs-theme="dark" className="imagecarousel">
      {imageUrls.map((imageUrl) => (
        <Carousel.Item key={imageUrl}>
          <div className="imagecarousel-imagecontainer">
            <img src={imageUrl} />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const SingleProduct = () => {
  const navigate = useNavigate();

  // Read product id from current URI and parse it
  let { id } = useParams();
  id = parseString(id);

  // Fetch product with Tanstack Query
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

  return (
    <Container>
      <BreadCrumb className="fs-5 ms-5">
        <BreadCrumb.Item onClick={() => navigate('/')}>Home</BreadCrumb.Item>
        <BreadCrumb.Item onClick={() => navigate('/')}>
          Products
        </BreadCrumb.Item>
        <BreadCrumb.Item onClick={() => navigate(`/products/${data.category}`)}>
          {data.category}
        </BreadCrumb.Item>
      </BreadCrumb>
      <Row>
        <Col>{data.imgs && <ImageCarousel images={data.imgs} />}</Col>
        <Col className="product-info">
          <h1>{data.title}</h1>
          <p style={{ color: 'coral' }} className="fs-1">
            {padPrice(data.price)}€
          </p>
          {data.rating && (
            <Row className="mb-4">
              <StarRating rating={data.rating} />
            </Row>
          )}
          <Col className="mb-4">
            {data.specs.map((spec, index) => (
              <p key={index}>{spec}</p>
            ))}
          </Col>
          <Button size="lg" className="custom-button">
            Add to cart
          </Button>
        </Col>
      </Row>
      <Reviews productId={id} />
      <ReviewForm productId={id} />
    </Container>
  );
};

export default SingleProduct;
