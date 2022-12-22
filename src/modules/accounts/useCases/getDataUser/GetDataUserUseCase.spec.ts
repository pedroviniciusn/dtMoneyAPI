import { AppError } from '@errors/AppError';

import { v4 as uuidV4 } from 'uuid';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepository,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  CreateUserUseCase,
} from '../createUser/CreateUserUseCase';

import {
  AuthenticateUserUseCase,
} from '../authenticateUser/AuthenticateUserUseCase';

import { GetDataUserUseCase } from './GetDataUserUseCase';


let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let getDataUserUseCase: GetDataUserUseCase;

describe('Get Data User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
    );
    getDataUserUseCase = new GetDataUserUseCase(
      inMemoryUserRepository,
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

    const userData = await inMemoryUserRepository.findByEmail(userResult.user.email);

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
      const id = uuidV4();
      
      await getDataUserUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });
});