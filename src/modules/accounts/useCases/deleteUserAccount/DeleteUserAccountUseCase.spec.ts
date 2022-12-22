import { AppError } from '@errors/AppError';

import { v4 as uuidV4 } from 'uuid';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepository,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  CreateUserUseCase,
} from '../createUser/CreateUserUseCase';

import { DeleteUserAccountUseCase } from './DeleteUserAccountUseCase';


let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let deleteUserAccountUseCase: DeleteUserAccountUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    deleteUserAccountUseCase = new DeleteUserAccountUseCase(inMemoryUserRepository);
  });

  it('Should be able to delete a user', async () => {
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

    await deleteUserAccountUseCase.execute(userCreated.id);

    const checkUserDeleted = await inMemoryUserRepository.findByEmail(user.email);

    expect(checkUserDeleted).toBeUndefined();
  });

  it('Should not be able to delete an nonexistent user', async () => {
    expect(async () => {
      const id = uuidV4();

      await deleteUserAccountUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });
});
