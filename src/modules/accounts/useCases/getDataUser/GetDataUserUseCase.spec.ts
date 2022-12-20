import { AppError } from '@errors/AppError';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepositoy,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  CreateUserUseCase,
} from '../createUser/CreateUserUseCase';

import {
  AuthenticateUserUseCase,
} from '../authenticateUser/AuthenticateUserUseCase';

import { GetDataUserUseCase } from './GetDataUserUseCase';


let inMemoryUserRepositoy: InMemoryUserRepositoy;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let getDataUserUseCase: GetDataUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUserRepositoy = new InMemoryUserRepositoy();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepositoy,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepositoy,
    );
    getDataUserUseCase = new GetDataUserUseCase(
      inMemoryUserRepositoy,
    );
  });

  it('Should be able to get data user', async () => {
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

    const userResult = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const userData = await inMemoryUserRepositoy.findByEmail(userResult.user.email);

    const data = await getDataUserUseCase.execute(userData.id);

    expect(data).toEqual(
      expect.objectContaining({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      })
    );
  });

  it('Should not be able to get data an nonexistent user', async () => {
    expect(async () => {
      await getDataUserUseCase.execute('ahiudhaskjdfhasdkjahsfkja');
    }).rejects.toBeInstanceOf(AppError);
  });
});