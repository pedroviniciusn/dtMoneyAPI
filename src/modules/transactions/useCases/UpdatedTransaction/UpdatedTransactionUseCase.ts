import { inject, injectable } from 'tsyringe';

import { 
  IUpdateTransactionDTO,
} from '@modules/transactions/dtos/IUpdateTransactionDTO';

import { 
  ITransactionsRepository,
} from '@modules/transactions/repositories/ITransactionRepository';

import { 
  AppError,
} from '@errors/AppError';
import { Transactions } from '@modules/transactions/entities/Transactions';

@injectable()
export class UpdatedTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  async execute({
    transactionId,
    title,
    amount,
    category,
    type,
  }: IUpdateTransactionDTO): Promise<Transactions> {
    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new AppError('Transaction not found')
    }

    const transactionUpdated = await this.transactionRepository.update({
      transactionId,
      title,
      amount,
      category,
      type,
    });

    return transactionUpdated;
  }
}