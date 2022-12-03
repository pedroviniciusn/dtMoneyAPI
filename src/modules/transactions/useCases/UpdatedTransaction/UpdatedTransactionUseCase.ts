import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUpdateTransactionDTO } from '../../dtos/IUpdateTransactionDTO';
import { ITransactionsRepository } from '../../repositories/ITransactionRepository';

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
  }: IUpdateTransactionDTO): Promise<void> {
    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new AppError('Transaction not found')
    }

    await this.transactionRepository.update({
      transactionId,
      title,
      amount,
      category,
      type,
    })
  }
}