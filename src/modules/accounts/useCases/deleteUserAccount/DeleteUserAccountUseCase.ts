import { inject, injectable } from 'tsyringe';

import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';

import {
  AppError,
} from '@errors/AppError';

@injectable()
export class DeleteUserAccountUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found')
    }

    await this.userRepository.delete(user.id);
  }
}