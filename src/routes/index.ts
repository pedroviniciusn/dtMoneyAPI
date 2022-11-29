import { Router } from 'express';
import { transactionRoutes } from './transaction.router';
import { userRoutes } from './user.router';

const router = Router();

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);

export { router }; 
