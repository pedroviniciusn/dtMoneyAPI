import { inject, injectable } from 'tsyringe';

import {
  User,
 } from '@modules/accounts/entities/User';

 import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';

import {
  AppError,
} from '@errors/AppError';


@injectable()
export class GetDataUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found')
    }

    return user;
  }
 }