import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { LoginCredentials, LoginPayload } from '#src/types/types';
import { isObject, isApiErrorResponse, isLoginPayload } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/authorization`;

const login = async (
  credentials: LoginCredentials
): Promise<LoginPayload | undefined> => {

  const responseIsValid = (response: unknown): boolean => {
    return (
      isObject(response) &&
      'payload' in response &&
      isLoginPayload(response.payload)
    );
  };

  try {
    const response = await axios.post<{ payload: LoginPayload }>(`${baseUrl}/login`, credentials);
    console.log(response);
    if (responseIsValid(response.data)) {
      return response.data.payload;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while logging in');
    }
  }

  return undefined;
};

export default { login };