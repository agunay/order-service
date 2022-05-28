import request from 'supertest';
import { randomUUID } from 'crypto';
import path from 'node:path';
import { app } from '../../app';
import { sqliteDb } from '../../database/SqliteDb';

beforeAll(async () => {
  sqliteDb.connect(path.join(__dirname, '../customers-test.db'));
});

it('throws validation error if item id is not a uuid', async () => {
  const id = '123';
  const response = await request(app).get(`/api/item/${id}`).send().expect(400);
  expect(response.body.errors).toEqual([
    { message: 'Item ID needs to be a UUID', field: 'id' },
  ]);
});

it('can can create & fetch an item', async () => {
  const id = randomUUID();
  await request(app)
    .post(`/api/item`)
    .send({
      id,
      name: 'awesome product',
      cost: 99.99,
      supplier: 'techdowg',
    })
    .expect(201);
  const response = await request(app).get(`/api/item/${id}`).send().expect(200);
  expect(response.body.id).toBe(id);
  expect(response.body.cost).toBe(99.99);
});
