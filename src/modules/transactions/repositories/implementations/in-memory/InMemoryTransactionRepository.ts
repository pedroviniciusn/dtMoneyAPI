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

class InMemoryTransactionRepository implements ITransactionsRepository {
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

  async update({
    transactionId,
    title,
    amount,
    category,
    type,
  }: IUpdateTransactionDTO): Promise<Transactions> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === transactionId
    );

    Object.assign(transaction, {
      title,
      amount,
      category,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }

  async delete(transactionId: string): Promise<void> {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === transactionId
    );

    if (transactionIndex > -1) {
      this.transactions.splice(transactionIndex);
    }
  }
  async findById(transactionId: string): Promise<Transactions> {
    return this.transactions.find((transaction) => transaction.id === transactionId);
  }
}

export { InMemoryTransactionRepository };
