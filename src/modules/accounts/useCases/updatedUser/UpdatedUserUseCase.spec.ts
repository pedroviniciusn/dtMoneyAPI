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

import { UpdatedUserUseCase } from './UpdatedUserUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let updatedUserUseCase: UpdatedUserUseCase;

describe('Update User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      );
    updatedUserUseCase = new UpdatedUserUseCase(
      inMemoryUserRepository,
    );
  });

  it('Should be able to update user data', async () => {
    const user : ICreateUserDTO = {
      name: 'User',
      email: 'user@update.com',
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

    const userUpdated = await updatedUserUseCase.execute({
      userId: userData.id,
      name: 'user updated',
      email: 'user@updatednow.com'
    })

    expect(userUpdated).toEqual(
      expect.objectContaining({
        id: userData.id,
        name: 'user updated',
        email: 'user@updatednow.com'
      })
    );
  });

  it('Should not be able to update data an nonexistent user', async () => {
    expect(async () => {
      const id = uuidV4();

      await updatedUserUseCase.execute({
        userId: id,
        name: 'user updated',
        email: 'user@Updated.com'
      })
    }).rejects.toBeInstanceOf(AppError);
  });
});