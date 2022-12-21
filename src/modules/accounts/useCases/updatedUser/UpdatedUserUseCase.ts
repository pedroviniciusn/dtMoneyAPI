import { inject, injectable } from 'tsyringe';

import {
  IUpdateUserDTO,
} from '@modules/accounts/dtos/IUpdateUserDTO';

import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';

import {
  AppError,
} from '@errors/AppError';
import { User } from '@modules/accounts/entities/User';

@injectable()
export class UpdatedUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    name,
    email,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 401);
    } 

    const userUpdated = await this.userRepository.update({
      userId,
      name,
      email,
    });

    return userUpdated;
  }
}