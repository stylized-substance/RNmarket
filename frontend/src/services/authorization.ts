import { backendAddress } from '#src/utils/config';
import axios from 'axios';
import { LoginCredentials, LoginPayload } from '#src/types/types';
import { isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/authorization`;

const login = async (
  credentials: LoginCredentials
): Promise<LoginPayload | undefined> => {
  try {
    const response = await axios.post<{ payload: LoginPayload }>(
      `${baseUrl}/login`,
      credentials
    );

    return response.data.payload;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while logging in');
    }
  }

  return undefined;
};

const refreshAccessToken = async (
  loggedOnUser: LoginPayload
): Promise<string> => {
  try {
    const response = await axios.post<{ accessToken: string }>(
      `${baseUrl}/refresh`,
      {
        refreshToken: loggedOnUser.refreshToken
      }
    );
    return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while refreshing access token');
    }
  }
};

export default { login, refreshAccessToken };
