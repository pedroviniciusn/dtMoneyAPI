import { Router } from 'express';
import { authenticateRoutes } from './authenticate.router';
import { transactionRoutes } from './transaction.router';
import { userRoutes } from './user.router';

const router = Router();

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use(authenticateRoutes);

export { router }; 
