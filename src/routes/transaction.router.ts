import { Router } from 'express';

import { 
  CreateTransactionController 
} from '../modules/transactions/useCases/createTransaction/CreateTransactionController';


const transactionRoutes = Router();

const createTransactionController = new CreateTransactionController();

transactionRoutes.post('/:id', createTransactionController.handle);

export { transactionRoutes };
