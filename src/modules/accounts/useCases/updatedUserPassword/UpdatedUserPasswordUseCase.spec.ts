import { AppError } from '@errors/AppError';

import { v4 as uuidV4 } from 'uuid';

import { compare } from 'bcryptjs';

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

import { UpdatedUserPasswordUseCase } from './UpdatedUserPasswordUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let updatedUserPasswordUseCase: UpdatedUserPasswordUseCase;

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      );
    updatedUserPasswordUseCase = new UpdatedUserPasswordUseCase(
      inMemoryUserRepository,
    );
  });

  it('Should be able to update user data', async () => {
    const user : ICreateUserDTO = {
      name: 'User test password',
      email: 'user@password.com',
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

    await updatedUserPasswordUseCase.execute({
      userId: userData.id,
      password: user.password,
      newPassword: 'teste00'
    });

    const userPassword = await inMemoryUserRepository.findById(userData.id);

    const passwordMatch = await compare(userPassword.password, userData.password);
    
    expect(passwordMatch).toBe(false);
  });

  it('Should not be able to update password an nonexistent user', async () => {
    expect(async () => {
      const id = uuidV4();

      await updatedUserPasswordUseCase.execute({
        userId: id,
        password: 'error',
        newPassword: 'erroragain'
      })
    }).rejects.toBeInstanceOf(AppError);
  });
});