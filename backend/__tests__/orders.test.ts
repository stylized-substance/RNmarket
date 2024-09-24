import supertest from 'supertest';
import app from '#src/app';
import {
  connectToDatabase,
  closeDatabaseConnection,
  dropAllTables
} from '#src/utils/database';
import {
  assert200Response,
  assert400Response,
  getToken,
  assertValidType,
  assert201Response
} from '#src/utils/testHelpers';
import { Order as OrderModel } from '#src/models';
import { Product as ProductModel } from '#src/models';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

const api = supertest(app);

// Declare variables for access tokens
let userAccessToken: string;
let adminAccessToken: string;

beforeEach(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();

  // Add test order to database
  const order = {
    id: uuidv4(),
    name: 'test name',
    address: 'test address'
  };

  const product: ProductModel | null = await ProductModel.findOne({});

  const orderInDb: OrderModel | null = await OrderModel.create(order);

  // @ts-expect-error - Sequelize model pecial methods/mixins don't seem to work with Typescript
  await orderInDb.addProduct(product, {
    through: { quantity: 1 }
  });

  // Define regular and admin users and get access tokens for them
  const user = {
    username: 'test_user@example.org',
    password: 'password'
  };
  const adminUser = {
    username: 'admin@example.org',
    password: 'password'
  };

  // Assign access tokens to global variables
  userAccessToken = await getToken(user);
  adminAccessToken = await getToken(adminUser);
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('GET requests', () => {
  test('GET - Admin user can get all orders from database', async () => {
    const response = await api
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    assert200Response(response);
    expect(response.body.orders).toHaveLength(1);
    expect(response.body.orders[0]).toHaveProperty('id');
    expect(response.body.orders[0]).toHaveProperty('name');
    expect(response.body.orders[0]).toHaveProperty('address');
    expect(response.body.orders[0]).toHaveProperty('Products');

    for (const product of response.body.orders[0].Products) {
      assertValidType('product', product);
    }
  });
  test('GET - Request fails if there are no orders in database', async () => {
    // Remove all orders from database
    const orders = await OrderModel.findAll();
    for (const order of orders) {
      // @ts-expect-error - Sequelize model pecial methods/mixins don't seem to work with Typescript
      await order.setProducts([]);
      await order.destroy();
    }

    const response = await api
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminAccessToken}`);

    assert400Response(response);
    expect(response.body).toStrictEqual({
      Message: 'No orders found in database'
    });
  });
  test('GET - Request fails for regular user', async () => {
    const response = await api
      .get('/api/orders')
      .set('Authorization', `Bearer ${userAccessToken}`);

    assert400Response(response);
    expect(response.body).toStrictEqual({
      Error: 'Only admin users can list orders'
    });
  });
});
describe('POST requests', () => {
  test.only('POST - A valid order can be added', async () => {
    // Get an in stock product from database for order
    const product: ProductModel | null = await ProductModel.findOne({
      where: {
        instock: {
          [Op.gt]: 0
        }
      }
    });

    const order = {
      products: [
        {
          id: product?.dataValues.id,
          quantity: 1
        }
      ],
      name: 'test_name',
      address: 'test_address'
    };

    // Get a temporary access token for making order
    const checkoutResponse = await api.post('/api/checkout').send(order);

    const accessToken = checkoutResponse.body.accessToken;

    // Create new order
    const response = await api
      .post('/api/orders')
      .send(order)
      .set('Authorization', `Bearer ${accessToken}`);

    assert201Response(response)
    expect(response.body).toHaveProperty('orderInDb')
  });
});
