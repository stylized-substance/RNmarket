import supertest from 'supertest';
import app from '#src/app';
import { assert200Response } from '#src/utils/testHelpers';
import { isString } from '#src/utils/typeNarrowers';

const api = supertest(app);

describe('POST requests', () => {
  test('POST - Sending a valid shopping cart returns a temporary access token', async () => {
    const mockCart = {
      products: [
        {
          id: 'id',
          quantity: 1
        }
      ]
    };

    const response = await api.post('/api/checkout').send(mockCart);

    assert200Response(response);
    expect(response.body).toHaveProperty('accessToken');
    expect(isString(response.body.accessToken)).toBe(true);
  });
});
