import Row from 'react-bootstrap/Row';

const ProductsError = ({ error }: { error: Error }) => {
  console.error('Error from ProductsError component:', error.message);

  return (
    <Row>
      <h4>An error happened while getting products</h4>
    </Row>
  );
};

export default ProductsError;
