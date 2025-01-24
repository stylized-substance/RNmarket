import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { ReviewFromBackend, NewReview, LoginPayload } from '#src/types/types';
import errorHandler from '#src/utils/errorHandler';
import { isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/reviews`;

//TODO: Improve the catch block
const getAllForProduct = async (
  productId: string
): Promise<ReviewFromBackend[] | null> => {
  try {
    const response = await axios.get<{ reviews: ReviewFromBackend[] }>(
      `${baseUrl}/?product_id=${productId}`
    );
    return response.data.reviews;
  } catch (error) {
    console.error(errorHandler(error));
  }

  return null;
};

const postNew = async (
  review: NewReview,
  loggedOnUser?: LoginPayload
): Promise<ReviewFromBackend> => {
  if (!loggedOnUser) {
    throw new Error('Not logged in');
  }

  try {
    const response = await axios.post<{ addedReview: ReviewFromBackend }>(
      baseUrl,
      review,
      {
        headers: {
          Authorization: `Bearer ${loggedOnUser.accessToken}`
        }
      }
    );

    return response.data.addedReview;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while posting review');
    }
  }
};

export default { getAllForProduct, postNew };
