import request from 'supertest';

import { app } from '../../../../server';

import { Connection } from 'typeorm';

import createConnection from '@database/index';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/api/account').send({
      name: 'user test',
      email: 'user@test.com',
      password: 'test123',
    });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('message');
  });

  it('Should not be able to create a new user if not provided all informations', async () => {
    const response = await request(app).post('/api/account').send({
      name: '',
      email: 'user@test.com',
      password: 'test123',
    });

    expect(response.status).toBe(400);
  });
});