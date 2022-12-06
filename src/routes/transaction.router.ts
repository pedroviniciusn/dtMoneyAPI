import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  CreateTransactionController 
} from '../modules/transactions/useCases/createTransaction/CreateTransactionController';
  
import { 
  UpdatedTransactionController 
} from '../modules/transactions/useCases/UpdatedTransaction/UpdatedTransactionController';

import { 
  DeleteTransactionController 
} from '../modules/transactions/useCases/deleteTransaction/DeleteTransactionController';



const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();
const updatedTransactionController =  new UpdatedTransactionController();
const deleteTransactionController = new DeleteTransactionController();

transactionRoutes.post(
  'me/transactions', 
  ensureAuthenticated, 
  createTransactionController.handle
);

transactionRoutes.put(
  'me/transactions_data/:transaction_id',
  ensureAuthenticated,
  updatedTransactionController.handle,
);

transactionRoutes.delete(
  'me/transactions/:transaction_id', 
  ensureAuthenticated, 
  deleteTransactionController.handle,
);

export { transactionRoutes };
