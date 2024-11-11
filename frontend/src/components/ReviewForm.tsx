import { useState } from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ReviewForm = ({ productId }: { productId: string | undefined }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // setValidated(true);
    console.log('validated');
    // await reviewsService.getAllForProduct(productId);
  };

  return (
    <>
      <h2>Leave a review</h2>
      <Form
        noValidate
        onSubmit={handleSubmit}
        validated={validated}
        className="mb-5"
      >
        <Form.Group controlId="validationReviewTitle" className="mb-3">
          <Form.Label>
            <b>Title</b>
          </Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              isInvalid
              type="text"
              placeholder="Enter a review title"
              className="mb-3"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Enter a title
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Label>
          <b>Rating</b>
        </Form.Label>
        <Form.Select
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
          className="mb-3"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
        <Form.Control
          required
          as="textarea"
          rows={5}
          placeholder="Write a review"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></Form.Control>

        <Button
          type="submit"
          size="lg"
          // onClick={void handleReviewSend(productId)}
          className="custom-button"
        >
          Send
        </Button>
      </Form>
    </>
  );
};

export default ReviewForm;
