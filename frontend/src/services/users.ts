import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { NewUser } from '#src/types/types.ts';
import { isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/users`;

const register = async (userData: NewUser) => {
  try {
    const response = await axios.post<{ addedUser: NewUser }>(
      `${baseUrl}`,
      userData
    );

    console.log(response);
  } catch (error) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data['Error message']);
    } else {
      throw new Error('Unknown error happened while posting review');
    }
  }
};

export default { register };
