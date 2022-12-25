import request from 'supertest';

import { app } from '../../../../server';

import { v4 as uuidV4 } from 'uuid';

import { hash } from 'bcryptjs';

import { Connection } from 'typeorm';

import createConnection from '@database/index';

let connection: Connection;

describe('Updated User Controller', () => {
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

  it('Should be able to update data user', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'user@test.com',
      password: 'test',
    });

    const { token } = responseToken.body;

    const response = await request(app).put('/api/me/account_data').send({
      name: 'user updated'
    }).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('message');
  });

  it("Should not be able to update data user if user not authenticated", async () => {
    const response = await request(app).put('/api/me/account_data').set({
      Authorization: `Bearer ${'65b253e6fe67fbc15b0b4d09bdeaabff'}`
    });

    expect(response.status).toBe(401);
  });
});