import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { Review } from '#src/types/types';
// import { isReview } from '#src/utils/typeNarrowers';
import errorHandler from '#src/utils/errorHandler';

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

const postNew = async (id: string, review: Review) => {
  try {
  } catch (error) {
    console.error(errorHandler(error));
  }
};

export default { getAllForProduct };
