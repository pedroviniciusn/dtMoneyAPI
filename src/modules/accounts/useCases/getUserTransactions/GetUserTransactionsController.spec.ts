import request from 'supertest';

import { app } from '../../../../server';

import { v4 as uuidV4 } from 'uuid';

import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';

import createConnection from '@database/index';

let connection: Connection;

describe('Get User Transactions Controller', () => {
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

  it('Should be able to get all transactions from user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'test',
    });

    const { token } = responseToken.body;

    await request(app).post('/api/me/transactions').send({
      title: 'test',
      amount: 200.00,
      category: 'test',
      type: 'testing',
    }).set({
      Authorization: `Bearer ${token}`,
    }); 

    const response = await request(app).get('/api/me/account_transactions').set({
      Authorization: `Bearer ${token}`,
    });
    
    expect(response.body.length).toBe(1);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        title: 'test',
        amount: 200.00,
        category: 'test',
        type: 'testing',
      })
    );
  });

  it("Should not be able to get all transactions if user not authenticated", async () => {
    const response = await request(app).get('/api/me/account_transactions').set({
      Authorization: `Bearer jabfjkfasj31nr3j24jnadjc`,
    });

    expect(response.status).toBe(401);

    expect(response.body).toHaveProperty('message');
  });
});
