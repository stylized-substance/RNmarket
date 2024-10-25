import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchResults = () => {
  const { searchTerm } = useParams();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="flex-shrink-1">
          <h1>Search results for: {searchTerm}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResults;
