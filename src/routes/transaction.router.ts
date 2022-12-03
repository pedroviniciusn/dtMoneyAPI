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
  '/create_transaction', 
  ensureAuthenticated, 
  createTransactionController.handle
);

transactionRoutes.put(
  '/update_transaction/:transaction_id',
  ensureAuthenticated,
  updatedTransactionController.handle,
);

transactionRoutes.delete(
  '/delete_transaction/:transaction_id', 
  ensureAuthenticated, 
  deleteTransactionController.handle,
);

export { transactionRoutes };
