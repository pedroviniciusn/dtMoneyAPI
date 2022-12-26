import request from 'supertest';

import { app } from '../../../../server';

import { v4 as uuidV4 } from 'uuid';

import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';

import createConnection from '@database/index';

let connection: Connection;

describe('Update Transaction Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();

    const password = await hash('test', 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, "created_at", "updated_at")
      values('${id}', 'user', 'user@test.com', '${password}', 'now()', 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should not be able to update a transaction if transaction not found', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'test',
    });

    const { token } = responseToken.body;

    const response = await request(app).put(`/api/me/transactions_data/19387491374913`).send({
      title: 'test error',
      amount: 100.00,
      category: 'test error',
      type: 'testing error',
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('message');
  });

  it('Should not be able to update a transaction if user not authenticated', async () => {
    const response = await request(app).put(`/api/me/transactions_data/13792321894746172631`).send({
      title: 'test updated',
      amount: 400.00,
      category: 'test updated',
      type: 'testing updated',
    }).set({
      Authorization: `Bearer jkandasjndkasndkjasndkajbfaskj`,
    });

    expect(response.status).toBe(401);
  });

  it('Should be able to update a transaction', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'test',
    });

    const { token } = responseToken.body;

    const responseTransactionId = await request(app).post('/api/me/transactions').send({
      title: 'test',
      amount: 200.00,
      category: 'test',
      type: 'testing',
    }).set({
      Authorization: `Bearer ${token}`,
    }); 
  
    const transactionId = responseTransactionId.body.transaction.id;

    const response = await request(app).put(`/api/me/transactions_data/${transactionId}`).send({
      title: 'test updated',
      amount: 400.00,
      category: 'test updated',
      type: 'testing updated',
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('message');

    expect(response.body).toHaveProperty('transactionUpdated');

    expect(response.body.transactionUpdated).toEqual(
      expect.objectContaining({
        id: transactionId,
        title: 'test updated',
        amount: 400.00,
        category: 'test updated',
        type: 'testing updated',
      })
    );
  });
});