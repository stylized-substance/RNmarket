import Col from 'react-bootstrap/Col';

import Stack from 'react-bootstrap/Stack';

import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <Col className="d-flex flex-column justify-content-center">
      <h1 className="text-center pb-5">Hello, select a product category</h1>
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
    </Col>
  );
};

export default Home;
