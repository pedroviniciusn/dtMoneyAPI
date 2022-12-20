import {
  User,
} from '@modules/accounts/entities/User';

import {
  ICreateUserDTO,
} from '@modules/accounts/dtos/ICreateUserDTO';

import {
  IUpdateUserDTO,
} from '@modules/accounts/dtos/IUpdateUserDTO';

import {
  IUpdateUserPasswordDTO,
} from '@modules/accounts/dtos/IUpdateUserPasswordDTO';

import {
  IUserRepository,
} from '../../IUserRepository';

class InMemoryUserRepositoy implements IUserRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
    });

    this.users.push(user);
  }

  async update({
    name,
    email,
  }: IUpdateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
    });

    this.users.push(user);
  }

  async updatePassword({
    userId,
    password,
    newPassword,
  }: IUpdateUserPasswordDTO): Promise<void> {
    const user = this.users.find((user) => user.id === userId);

    user.password = newPassword;

    this.users.push(user);
  }
  
  async delete(userId: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex > -1) {
      this.users.splice(userIndex);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(userId: string): Promise<User> {
    return this.users.find((user) => user.id === userId);
  }

  async findByIdAndGetPassword(userId: string): Promise<User> {
    return this.users.find((user) => user.id === userId);
  }
}

export { InMemoryUserRepositoy };
