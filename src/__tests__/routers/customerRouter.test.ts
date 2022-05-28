import request from 'supertest';
import { app } from '../../app';
import path from 'node:path';
import { sqliteDb } from '../../database/SqliteDb';

beforeAll(async () => {
  sqliteDb.connect(path.join(__dirname, '../customers-test.db'));
});

afterAll(async () => {
  sqliteDb.close();
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

it('can fetch a customer', async () => {
  const id = 'ca48570d-6265-453a-b9da-ca9bc982bfee';
  const response = await request(app)
    .get(`/api/customer/${id}`)
    .send()
    .expect(200);
  expect(response.body.id).toBe(id);
});
