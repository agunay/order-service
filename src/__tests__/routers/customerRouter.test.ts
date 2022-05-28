import request from 'supertest';
import { randomUUID } from 'crypto';
import path from 'node:path';
import { app } from '../../app';
import { sqliteDb } from '../../database/SqliteDb';

beforeAll(async () => {
  sqliteDb.connect(path.join(__dirname, '../customers-test.db'));
});

it('throws validation error if customer id is not a uuid', async () => {
  const id = '123';
  const response = await request(app)
    .get(`/api/customer/${id}`)
    .send()
    .expect(400);
  expect(response.body.errors).toEqual([
    { message: 'Customer ID needs to be a UUID', field: 'id' },
  ]);
});

it('can can create & fetch a customer', async () => {
  const createCustomerResponse = await request(app)
    .post(`/api/customer`)
    .send({
      email: 'test@test.com',
      given_name: 'test',
      family_name: 'test',
    })
    .expect(201);
  const response = await request(app)
    .get(`/api/customer/${createCustomerResponse.body.id}`)
    .send()
    .expect(200);
  expect(response.body.id).toBe(createCustomerResponse.body.id);
  expect(response.body.email).toBe('test@test.com');
});
