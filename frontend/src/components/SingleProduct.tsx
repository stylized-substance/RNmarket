import { backendAddress } from '#src/utils/config';

import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import productsService from '#src/services/products';
import reviewsService from '#src/services/reviews'
import { padPrice } from '#src/utils/padPrice.ts';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import BreadCrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import ProductsPending from '#src/components/ProductsPending';
import ProductsError from '#src/components/ProductsError';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
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

const StarRating = ({ rating }: { rating: number }) => {
  // Define star rating icons
  const emptyStar = <i className="bi bi-star text-warning fs-5"></i>;
  const fillStar = <i className="bi bi-star-fill text-warning fs-5"></i>;

  const stars = Array(5)
    .fill(null)
    .map((_, index) => {
      const starIsFilled = index < rating;

      return starIsFilled ? fillStar : emptyStar;
    });

  return <div>{stars}</div>;
};

const SingleProduct = () => {
  const navigate = useNavigate();

  const handleReviewSend = (productId) => {
    reviewsService.getAllForProduct(productId)
  }

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

  console.log(data.Reviews);

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
      <Stack gap={5} className="mt-5 mb-5">
        <h2 className="text-center">Product Reviews</h2>
        {data.Reviews?.map((review) => (
          <Stack key={review.id}>
            <b>
              <u>{review.title}</u>
            </b>
            <p className="border  rounded p-3 mt-2 mb-2">
              <em>{review.content}</em>
            </p>
            <div>
              Sent by: <b> {review.name}</b>
            </div>
          </Stack>
        ))}
          <hr className="border-2" />
        <Form>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={5} placeholder="Write a review"></Form.Control>
          </Form.Group>
          <Button size="lg" onClick={() => handleReviewSend(id)} className="custom-button">
            Send
          </Button>
        </Form>
      </Stack>
    </Container>
  );
};

export default SingleProduct;
