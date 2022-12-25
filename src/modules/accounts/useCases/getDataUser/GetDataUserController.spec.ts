import request from 'supertest';

import { app } from '../../../../server';

import { v4 as uuidV4 } from 'uuid';

import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';

import createConnection from '@database/index';

let connection: Connection;

describe('Get Data User Controller', () => {
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

  it('Should be able to get data user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'test',
    });

    const { token } = responseToken.body;

    const response = await request(app).get('/api/me').set({
      Authorization: `Bearer ${token}`
    });

    expect(response.body).toHaveProperty('id');

    expect(response.body).toHaveProperty('name');

    expect(response.body).toHaveProperty('email');

    expect(response.body).toHaveProperty('transactions');
  });

  it("Should not be able to get data user if user not authenticated", async () => {
    const response = await request(app).get('/api/me').set({
      Authorization: `Bearer '65b253e6fe67fbc15b0b4d09bdeaabff'`
    });

    expect(response.status).toBe(401);
  });
});
