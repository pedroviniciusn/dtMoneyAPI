import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { Transactions } from '../../../transactions/entities/Transactions';
import { IUserRepository } from '../../repositories/IUserRepository';


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