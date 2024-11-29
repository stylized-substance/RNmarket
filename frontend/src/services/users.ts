import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { NewUser } from '#src/types/types.ts';
import { isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/users`;

const register = async (userData: NewUser): Promise<void> => {
  try {
    await axios.post<{ addedUser: NewUser }>(
      `${baseUrl}`,
      userData
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while registering user');
    }
  }
};

export default { register };
