import { ICreateTransactionsDTO } from '../dtos/ICreateTransactionsDTO';
import { Transactions } from '../entities/Transactions';

interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<void>;
  delete(transactionId: string): Promise<void>;
  findById(transactionId: string): Promise<Transactions>;
}

export { ITransactionsRepository };
