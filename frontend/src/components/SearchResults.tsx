import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchResults = () => {
  const { searchTerm } = useParams();

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center m-4">Search results for: {searchTerm}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResults;
