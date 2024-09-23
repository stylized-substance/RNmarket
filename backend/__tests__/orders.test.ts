import supertest from 'supertest';
import app from '#src/app';
import {
  connectToDatabase,
  closeDatabaseConnection,
  dropAllTables
} from '#src/utils/database';
import { assert200Response, assert400Response, getToken, assertValidType } from '#src/utils/testHelpers';
import { Order as OrderModel } from '#src/models';
import { Product as ProductModel } from '#src/models';
import { v4 as uuidv4 } from 'uuid';

const api = supertest(app);

// Declare variables for access tokens
// let userAccessToken: string;
let adminAccessToken: string;

beforeEach(async () => {
  // Empty database and run migrations
  await dropAllTables();
  await connectToDatabase();

  // Define regular and admin users and get access tokens for them
  // const user = {
  //   username: 'test_user@example.org',
  //   password: 'password'
  // };
  const adminUser = {
    username: 'admin@example.org',
    password: 'password'
  };

  // Assign access tokens to global variables
  // userAccessToken = await getToken(user);
  adminAccessToken = await getToken(adminUser);
});

afterAll(async () => {
  await closeDatabaseConnection();
});

describe('GET requests', () => {
  test('GET - Admin user can get all orders from database', async () => {
    // Get a product from database
    const product: ProductModel | null = await ProductModel.findOne({})

    if (product) {
      // Add test order to database
      const order = {
        id: uuidv4(),
        name: 'test name',
        address: 'test address'
      }

      const orderInDb: OrderModel | null = await OrderModel.create(order)

      // @ts-expect-error - Sequelize model pecial methods/mixins don't seem to work with Typescript
      await orderInDb.addProduct(product, {
        through: { quantity: 1 }
      });
  
      const response = await api
        .get('/api/orders')
        .set('Authorization', `Bearer ${adminAccessToken}`)

      assert200Response(response)
      expect(response.body.orders).toHaveLength(1)
      expect(response.body.orders[0]).toHaveProperty('id')
      expect(response.body.orders[0]).toHaveProperty('name')
      expect(response.body.orders[0]).toHaveProperty('address')
      expect(response.body.orders[0]).toHaveProperty('Products')

      for (const product of response.body.orders[0].Products) {
        assertValidType('product', product)
      }
    }
  })
  test('GET - Request gets error reply if there are no orders in database', async () => {
    const response = await api
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminAccessToken}`)

    assert400Response(response)
    expect(response.body).toStrictEqual({
      Message: 'No orders found in database'
    })
  })

})