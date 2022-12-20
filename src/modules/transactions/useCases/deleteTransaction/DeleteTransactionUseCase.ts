import { inject, injectable } from 'tsyringe';

import {
  ITransactionsRepository,
} from '@modules/transactions/repositories/ITransactionRepository';

import {
  AppError,
} from '@errors/AppError';

@injectable()
export class DeleteTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  async execute(
    transactionId: string,
  ): Promise<void> {
    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new AppError('Transaction not found')
    }

    await this.transactionRepository.delete(transaction.id);
  }
}