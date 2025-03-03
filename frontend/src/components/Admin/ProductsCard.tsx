import { Product } from '#src/types/types.ts';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

const ProductsCard = ({ products }: { products: Product[] | undefined }) => {
  return (
    <Card>
      <Card.Header>Products in database</Card.Header>
      <Card.Body>
        <Accordion>
          {products?.map((product) => (
            <Accordion.Item key={product.id} eventKey={product.id}>
              <Accordion.Header>{product.title}</Accordion.Header>
              <Accordion.Body>
                <dl>
                  <dt>Id</dt>
                  <dd>{product.id}</dd>
                  <dt>Category</dt>
                  <dd>{product.category}</dd>
                  <dt>Price</dt>
                  <dd>{product.price}</dd>
                  <dt>Amount of product in stock</dt>
                  <dd>{product.instock}</dd>
                  <dt>Created at</dt>
                  <dd>{product.createdAt}</dd>
                  <dt>Updated at</dt>
                  <dd>{product.updatedAt}</dd>
                </dl>
                <Button
                  style={{ background: 'firebrick' }}
                  onClick={() => handleRemove(product.id)}
                  className="d-flex gap-2"
                >
                  <div>Delete</div>
                  <i className="bi bi-trash3"></i>
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default ProductsCard;
