import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProductsErrorProps {
  error: Error;
}

const ProductsError = ({ error }: ProductsErrorProps) => {
  console.error('Error from ProductsError component:', error.message);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className="text-center">
            An error happened while getting products
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsError;
