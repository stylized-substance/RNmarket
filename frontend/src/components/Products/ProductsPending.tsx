import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const ProductsPending = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <Spinner animation="grow" role="status" />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPending;
