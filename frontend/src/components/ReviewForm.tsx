import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '#src/hooks/useAuth.ts';
import { useToast } from '#src/context/ToastContext';
import reviewsService from '#src/services/reviews';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Formik } from 'formik';
import * as yup from 'yup';
import { LoginPayload, NewReview } from '#src/types/types';

interface ReviewFormValues {
  title: string;
  rating: number;
  content: string;
}

const ReviewForm = ({ productId }: { productId: string }) => {
  // Import currently logged on user and access token refreshal hook
  const { loggedOnUser, refreshAccessToken } = useAuth();

  const { changeToast } = useToast();

  const queryClient = useQueryClient();

  // Post new review using Tanstack Query
  const reviewMutation = useMutation({
    mutationFn: async ({
      loggedOnUser,
      newReview
    }: {
      loggedOnUser: LoginPayload;
      newReview: NewReview;
    }) => {
      await reviewsService.postNew(newReview, loggedOnUser);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['singleProductReviews']
      });
      changeToast({
        message: 'Review posted successfully',
        show: true
      });
    },
    onError: async (error, { newReview, loggedOnUser }) => {
      if (error.message === 'jwt expired') {
        // Refresh expired access token and retry posting review
        try {
          await refreshAccessToken.mutateAsync(loggedOnUser);
        } catch (error: unknown) {
          if (error instanceof Error) {
            changeToast({
              message: error.message,
              show: true
            });
          }
        }
        const loggedOnUserRefreshed = queryClient.getQueryData<LoginPayload>([
          'loggedOnUser'
        ]);
        await reviewsService.postNew(newReview, loggedOnUserRefreshed);
        await queryClient.invalidateQueries({
          queryKey: ['singleProductReviews']
        });
      }
    }
  });

  const handleSubmit = (formValues: ReviewFormValues) => {
    const newReview: NewReview = {
      product_id: productId,
      ...formValues
    };

    if (loggedOnUser) {
      reviewMutation.mutate({ loggedOnUser, newReview });
    }
  };

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
        onSubmit={(values) => handleSubmit(values)}
        initialValues={{
          title: '',
          rating: 1,
          content: ''
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="mb-5">
            <Form.Group controlId="validationReviewTitle">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Write a title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={touched.title && !!errors.title}
                  className="mb-3"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationReviewRating">
              <Form.Label>
                <b>Rating</b>
              </Form.Label>
              <InputGroup hasValidation style={{ width: '80px' }}>
                <Form.Select
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                  isInvalid={touched.rating && !!errors.rating}
                  className="mb-3"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="validationReviewContent">
              <InputGroup hasValidation>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write a review"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  isInvalid={touched.content && !!errors.content}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.content}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {loggedOnUser ? (
              <Button type="submit" size="lg" className="custom-button mt-3">
                Send
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  size="lg"
                  disabled
                  className="custom-button mt-3"
                >
                  Send
                </Button>
                <p className="mt-3">
                  <b>Please login to send a review</b>
                </p>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ReviewForm;
