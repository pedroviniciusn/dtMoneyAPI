import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/app-data-source';
import { User } from '../../../accounts/entities/User';
import { IUserRepository } from '../../../accounts/repositories/IUserRepository';
import { ICreateTransactionsDTO } from '../../dtos/ICreateTransactionsDTO';
import { Transactions } from '../../entities/Transactions';
import { ITransactionsRepository } from '../ITransactionRepository';


export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transactions>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = myDataSource.getRepository(Transactions);
    this.userRepository = myDataSource.getRepository(User);
  }

  async create({
    id,
    title,
    amount,
    category,
    type,
  }: ICreateTransactionsDTO): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: id
    });

    const transaction = this.repository.create({
      title,
      amount,
      category,
      type,
    });

    await this.repository.save(transaction);

    user.transactions = [transaction];

    await this.userRepository.save(user);
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Transactions> {
    throw new Error('Method not implemented.');
  }
}
  