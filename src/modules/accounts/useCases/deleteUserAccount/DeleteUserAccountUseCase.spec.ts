import { AppError } from '@errors/AppError';

import { v4 as uuidV4 } from 'uuid';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepositoy,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  CreateUserUseCase,
} from '../createUser/CreateUserUseCase';

import { DeleteUserAccountUseCase } from './DeleteUserAccountUseCase';


let inMemoryUserRepositoy: InMemoryUserRepositoy;
let createUserUseCase: CreateUserUseCase;
let deleteUserAccountUseCase: DeleteUserAccountUseCase;

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUserRepositoy = new InMemoryUserRepositoy();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepositoy);
    deleteUserAccountUseCase = new DeleteUserAccountUseCase(inMemoryUserRepositoy);
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

    const userCreated = await inMemoryUserRepositoy.findByEmail(user.email);

    await deleteUserAccountUseCase.execute(userCreated.id);

    const checkUserDeleted = await inMemoryUserRepositoy.findByEmail(user.email);

    expect(checkUserDeleted).toBeUndefined();
  });

  it('Should not be able to delete an nonexistent user', async () => {
    expect(async () => {
      const id = uuidV4();

      await deleteUserAccountUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });
});
