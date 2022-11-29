import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUserRepository } from '../../../accounts/repositories/IUserRepository';
import { ICreateTransactionsDTO } from '../../dtos/ICreateTransactionsDTO';
import { ITransactionsRepository } from '../../repositories/ITransactionRepository';


@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('TransactionRepository')
    private transactionRepository: ITransactionsRepository,
  ) {}

  async execute({
    id,
    title,
    amount,
    category,
    type,
  }: ICreateTransactionsDTO): Promise<void> {
    const user = this.userRepository.findById(id);

    if(!user) {
      throw new AppError('User not found');
    }

    await this.transactionRepository.create({
      id,
      title,
      amount,
      category,
      type,
    })
  }
} 