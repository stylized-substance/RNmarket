import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';

interface ReviewFormValues {
  title: string;
  rating: number;
  content: string;
}

const ReviewForm = ({ productId }: { productId: string | undefined }) => {
  const handleSubmit = () => {
    // event.preventDefault();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);
    console.log('validated');
    // await reviewsService.getAllForProduct(productId);
  };

  const { Formik } = formik;

  const formSchema = yup.object().shape({
    title: yup.string().required(),
    rating: yup.number().required().oneOf([1, 2, 3, 4, 5]),
    content: yup.string().required()
  });

  return (
    <>
      <h2>Leave a review</h2>
      <Formik<ReviewFormValues>
        validationSchema={formSchema}
        onSubmit={handleSubmit}
        initialValues={{
          title: '',
          rating: 1,
          content: ''
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="mb-5">
            <Form.Group controlId="validationReviewTitle" className="mb-3">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                // placeholder="Enter a review title"
                className="mb-3"
                onChange={handleChange}
                isValid={touched.title && !errors.title}
              ></Form.Control>
              <Form.Control.Feedback>Enter a title</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Rating</b>
              </Form.Label>
              <Form.Select
                value={values.rating}
                onChange={handleChange}
                className="mb-3"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                as="textarea"
                rows={5}
                placeholder="Write a review"
                value={values.content}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              size="lg"
              // onClick={void handleReviewSend(productId)}
              className="custom-button"
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReviewForm;
