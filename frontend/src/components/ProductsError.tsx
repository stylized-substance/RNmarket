import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface ProductsErrorProps {
  error: Error
}

const ProductsError = ({ error }: ProductsErrorProps) => {
  return (
    <Container>
        <Row>
          <Col>
            <h1 className="text-center">{error.message}</h1>
          </Col>
        </Row>
      </Container>
  )
}

export default ProductsError