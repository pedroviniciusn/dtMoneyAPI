import { AppError } from '@errors/AppError';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepository,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  CreateUserUseCase,
} from './CreateUserUseCase';


let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('Should be able to create a new user', async () => {
    const user : ICreateUserDTO = {
      name: 'User test',
      email: 'user@test.com',
      password: 'test123'
    }

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userCreated = await inMemoryUserRepository.findByEmail(user.email);

    expect(userCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new user if email exists', async () => {
    expect(async () => {
      const user : ICreateUserDTO = {
        name: 'User test',
        email: 'user@test.com',
        password: 'test123'
      }
  
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
  
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
