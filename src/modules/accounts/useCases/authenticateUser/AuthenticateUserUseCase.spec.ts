import { AppError } from '@errors/AppError';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepositoy,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  CreateUserUseCase,
} from '../createUser/CreateUserUseCase';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';


let inMemoryUserRepositoy: InMemoryUserRepositoy;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepositoy = new InMemoryUserRepositoy();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepositoy);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepositoy);
  });

  it('Should be able to authenticate user', async () => {
    const user : ICreateUserDTO = {
      name: 'User',
      email: 'user@authenticate.com',
      password: 'test123'
    }

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');

    expect(result).toHaveProperty('user');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'email@error.com',
        password: 'error123'
      })
    }).rejects.toBeInstanceOf(AppError);
  });
});