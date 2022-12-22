import {
  ICreateTransactionsDTO,
} from '../dtos/ICreateTransactionsDTO';

import {
  IUpdateTransactionDTO,
} from '../dtos/IUpdateTransactionDTO';

import {
  Transactions,
} from '../entities/Transactions';

interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<Transactions>;
  update(data: IUpdateTransactionDTO): Promise<Transactions>;
  delete(transactionId: string): Promise<void>;
  findById(transactionId: string): Promise<Transactions>;
}

export { ITransactionsRepository };
