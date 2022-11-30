import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  CreateTransactionController 
} from '../modules/transactions/useCases/createTransaction/CreateTransactionController';


const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();

transactionRoutes.post('/', ensureAuthenticated, createTransactionController.handle);

export { transactionRoutes };
