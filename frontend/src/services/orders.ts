import { backendAddress } from '#src/utils/config';
import axios from 'axios';

import { NewOrder } from '#src/types/types.ts';

import { isString } from '#src/utils/typeNarrowers';

const baseUrl = `${backendAddress}/api/orders`;

const postNew = (orderData: NewOrder, accessToken: unknown) => {
  console.log(orderData, accessToken);

  if (!isString(accessToken)) {
    throw new Error('Access token missing');
  }
};

export default { postNew };
