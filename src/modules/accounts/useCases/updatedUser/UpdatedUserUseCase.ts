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
  }: IUpdateUserDTO): Promise<void> {
    const user = this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 401)
    } 

    await this.userRepository.update({
      userId,
      name,
      email,
    });
  }
}