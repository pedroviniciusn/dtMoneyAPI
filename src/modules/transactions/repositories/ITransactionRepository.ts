import { ICreateTransactionsDTO } from '../dtos/ICreateTransactionsDTO';
import { Transactions } from '../entities/Transactions';

interface ITransactionsRepository {
  create(data: ICreateTransactionsDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Transactions>;
}

export { ITransactionsRepository };
