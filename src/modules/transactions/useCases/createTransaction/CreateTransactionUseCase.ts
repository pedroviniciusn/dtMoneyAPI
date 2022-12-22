import { inject, injectable } from 'tsyringe';

import {
  Transactions,
} from '@modules/transactions/entities/Transactions';

import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';

import {
  ICreateTransactionsDTO,
} from '@modules/transactions/dtos/ICreateTransactionsDTO';

import {
  ITransactionsRepository,
} from '@modules/transactions/repositories/ITransactionRepository';

import {
  AppError,
} from '@errors/AppError';

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TransactionRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  async execute({
    userId,
    title,
    amount,
    category,
    type,
  }: ICreateTransactionsDTO): Promise<Transactions> {
    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new AppError('User not found');
    }

    const transaction = await this.transactionRepository.create({
      userId,
      title,
      amount,
      category,
      type,
    })

    return transaction;
  }
} 