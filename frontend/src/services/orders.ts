import { backendAddress } from '#src/utils/config';
import axios from 'axios';

import { LoginPayload, NewOrder, OrderInDb } from '#src/types/types.ts';
import { isString, isApiErrorResponse } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/orders`;

const getAll = async (
  loggedOnUser?: LoginPayload
): Promise<OrderInDb[] | []> => {
  if (!loggedOnUser?.isadmin) {
    throw new Error('Only admin users can get orders');
  }

  try {
    const response = await axios.get<{ orders: OrderInDb[] }>(baseUrl, {
      headers: {
        Authorization: `Bearer ${loggedOnUser.accessToken}`
      }
    });
    
    return response.data.orders;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while getting orders');
    }
  }
};

const postNew = async (
  orderData: NewOrder,
  accessToken: string
): Promise<OrderInDb> => {
  if (!isString(accessToken) || accessToken.length === 0) {
    throw new Error('Access token missing or invalid');
  }

  try {
    const response = await axios.post<{ orderInDb: OrderInDb }>(
      baseUrl,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return response.data.orderInDb;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && isApiErrorResponse(error.response?.data)) {
      throw new Error(error.response.data.Error);
    } else {
      throw new Error('Unknown error happened while sending order');
    }
  }
};

export default { postNew, getAll };
