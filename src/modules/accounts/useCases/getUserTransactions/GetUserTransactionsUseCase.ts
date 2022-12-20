import { inject, injectable } from 'tsyringe';

import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';

import {
  Transactions,
} from '@modules/transactions/entities/Transactions';

import {
  AppError,
} from '@errors/AppError';

@injectable()
export class GetUserTransactionsUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<Transactions[]> {
    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new AppError('User not found')
    }

    if (!user.transactions) {
      throw new AppError('Transactions not found');
    }

    return user.transactions;
  }
}