import {
  Transactions,
} from '@modules/transactions/entities/Transactions';

import {
  ITransactionsRepository,
} from '../../ITransactionRepository';

import {
  ICreateTransactionsDTO,
} from '@modules/transactions/dtos/ICreateTransactionsDTO';

import {
  IUpdateTransactionDTO,
} from '@modules/transactions/dtos/IUpdateTransactionDTO';
import { InMemoryUserRepository } from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

class InMemoryTransactionRepository implements ITransactionsRepository {

  constructor() {
    //this.userRepository = new InMemoryUserRepository();
  }

  transactions: Transactions[] = [];

  async create({
    userId,
    title,
    amount,
    category,
    type,
  }: ICreateTransactionsDTO): Promise<Transactions> {
    const transaction = new Transactions();

    Object.assign(transaction, {
      title,
      amount,
      category,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }

  update(data: IUpdateTransactionDTO): Promise<Transactions> {
    throw new Error('Method not implemented.');
  }
  delete(transactionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(transactionId: string): Promise<Transactions> {
    throw new Error('Method not implemented.');
  }
}

export { InMemoryTransactionRepository };
