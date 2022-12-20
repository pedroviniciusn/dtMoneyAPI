import { Repository } from 'typeorm';

import {
  myDataSource,
} from '@database/app-data-source';

import {
  User,
} from '@modules/accounts/entities/User';

import {
  Transactions,
} from '@modules/transactions/entities/Transactions';

import {
  ITransactionsRepository,
} from '../ITransactionRepository';

import {
  ICreateTransactionsDTO,
} from '@modules/transactions/dtos/ICreateTransactionsDTO';

import {
  IUpdateTransactionDTO,
} from '@modules/transactions/dtos/IUpdateTransactionDTO';

export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transactions>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = myDataSource.getRepository(Transactions);
    this.userRepository = myDataSource.getRepository(User);
  }

  async create({
    userId,
    title,
    amount,
    category,
    type,
  }: ICreateTransactionsDTO): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },

      relations: {
        transactions: true,
      }
    });

    const transaction = this.repository.create({
      title,
      amount,
      category,
      type,
    });

    await this.repository.save(transaction);

    if (!user.transactions) {
      user.transactions = [transaction];
    }

    user.transactions = [...user.transactions, transaction]

    await this.userRepository.save(user);
  }

  async update({
    transactionId,
    title,
    amount,
    category,
    type,
  }: IUpdateTransactionDTO): Promise<void> {
    const transaction = await this.repository.findOne({
      where: {
        id: transactionId,
      }
    });

    await this.repository.update(transaction.id, {
      title: title ? title : transaction.title,
      amount: amount ? amount : transaction.amount,
      category: category ? category : transaction.category,
      type: type ? type : transaction.type,
    })
  }

  async delete(transactionId: string): Promise<void> {
    await this.repository.delete(transactionId);
  }
  
  async findById(transactionId: string): Promise<Transactions> {
    const transaction = await this.repository.findOne({
      where: {
        id: transactionId,
      }
    })

    return transaction;
  }
}
  