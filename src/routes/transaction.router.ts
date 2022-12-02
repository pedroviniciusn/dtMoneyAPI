import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  CreateTransactionController 
} from '../modules/transactions/useCases/createTransaction/CreateTransactionController';
import { DeleteTransactionController } from '../modules/transactions/useCases/deleteTransaction/DeleteTransactionController';


const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();

transactionRoutes.post(
  '/create_transactions', 
  ensureAuthenticated, 
  createTransactionController.handle
);

transactionRoutes.delete(
  '/delete_transaction/:transaction_id', 
  ensureAuthenticated, 
  deleteTransactionController.handle
);

export { transactionRoutes };
