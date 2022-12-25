import { getRepository, Repository } from 'typeorm';

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
import { Console } from 'console';

export class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transactions>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Transactions);
    this.userRepository = getRepository(User);
  }

  async create({
    userId,
    title,
    amount,
    category,
    type,
  }: ICreateTransactionsDTO): Promise<Transactions> {
    const user = await this.userRepository.findOne({
      relations: ['transactions'],

      select: ['transactions', 'id'],

      where: {
        id: userId,
      },
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
    } else {
      user.transactions = [...user.transactions, transaction];
    }

    await this.userRepository.save(user);

    return transaction;
  }

  async update({
    transactionId,
    title,
    amount,
    category,
    type,
  }: IUpdateTransactionDTO): Promise<Transactions> {
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
    });

    return transaction;
  }

  async delete(transactionId: string): Promise<void> {
    await this.repository.delete(transactionId);
  }
  
  async findById(transactionId: string): Promise<Transactions> {
    const transaction = await this.repository.findOne(transactionId);

    return transaction;
  }
}
  