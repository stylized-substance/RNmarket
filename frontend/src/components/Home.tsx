import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <Row>
      <Row>
        <h1 className="text-center">Hello, select a product category</h1>;
      </Row>
      <Stack direction="horizontal" gap={3} className="justify-content-center">
        <Button className="custom-button" size="lg">
          Mobile phones
        </Button>
        <Button className="custom-button" size="lg">
          Furniture
        </Button>
        <Button className="custom-button" size="lg">
          Laptops
        </Button>
      </Stack>
    </Row>
  );
};

export default Home;
