import request from 'supertest';

import { app } from '../../../../server';

import { v4 as uuidV4 } from 'uuid';

import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';

import createConnection from '@database/index';

let connection: Connection;

describe('Create Transaction Controller', () => {
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

  it('Should be able to create a new transaction', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'test',
    });

    const { token } = responseToken.body;

    const response = await request(app).post('/api/me/transactions').send({
      title: 'test',
      amount: 200.00,
      category: 'test',
      type: 'testing',
    }).set({
      Authorization: `Bearer ${token}`,
    }); 

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('message');
    
    expect(response.body).toHaveProperty('transaction');

    expect(response.body.transaction).toEqual(
      expect.objectContaining({
        id: response.body.transaction.id,
        title: 'test',
        amount: 200.00,
        category: 'test',
        type: 'testing',
      })
    );
  });

  it("Should not be able to create a new transaction if user not authenticated", async () => {
    const response = await request(app).post('/api/me/transactions').send({
      title: 'test',
      amount: 200.00,
      category: 'test',
      type: 'testing',
    }).set({
      Authorization: `Bearer ihdhfusafkamdiofmsdl`,
    }); 

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty('message');
  });
});
