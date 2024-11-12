import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { Review, NewReview } from '#src/types/types';
import errorHandler from '#src/utils/errorHandler';
import { isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/reviews`;

const getAllForProduct = async (productId: string): Promise<Review[] | []> => {
  try {
    const response = await axios.get<{ reviews: Review[] }>(
      `${baseUrl}/${productId}`
    );
    return response.data.reviews;
  } catch (error) {
    console.error(errorHandler(error));
  }

  return [];
};

const postNew = async (review: NewReview) => {
  try {
    const response = await axios.post(`${baseUrl}`, review);
    console.log(response);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    }
  }
};

export default { getAllForProduct, postNew };
