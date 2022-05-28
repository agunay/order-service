import request from 'supertest';
import { randomUUID } from 'crypto';
import path from 'node:path';
import { app } from '../../app';
import { sqliteDb } from '../../database/SqliteDb';

beforeAll(async () => {
  sqliteDb.connect(path.join(__dirname, '../customers-test.db'));
});

it('throws validation error if order id is not a uuid', async () => {
  const id = '123';
  const response = await request(app)
    .get(`/api/order/${id}`)
    .send()
    .expect(400);
  expect(response.body.errors).toEqual([
    { message: 'Order ID needs to be a UUID', field: 'id' },
  ]);
});

it('can can create & fetch an order', async () => {
  const id = randomUUID();
  const createCustomerResponse = await request(app)
    .post(`/api/customer`)
    .send({
      email: 'test@test.com',
      given_name: 'test',
      family_name: 'test',
    })
    .expect(201);
  const createItemResponse1 = await request(app)
    .post(`/api/item`)
    .send({
      name: 'awesome product1',
      cost: 99.99,
      supplier: 'techdowg',
    })
    .expect(201);
  const createItemResponse2 = await request(app)
    .post(`/api/item`)
    .send({
      name: 'awesome product2',
      cost: 99.99,
      supplier: 'techdowg',
    })
    .expect(201);
  const createOrderResponse = await request(app)
    .post(`/api/order`)
    .send({
      customer_id: createCustomerResponse.body.id,
      order_items: [createItemResponse1.body.id, createItemResponse2.body.id],
    })
    .expect(201);
  expect(createOrderResponse).not.toBeUndefined();
});
