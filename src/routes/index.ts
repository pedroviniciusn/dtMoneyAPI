import { Router } from 'express';

import { authenticateRoutes } from './authenticate.router';

import { transactionRoutes } from './transaction.router';

import { userRoutes } from './user.router';

const router = Router();

router.use('/api', userRoutes);
router.use('/api', transactionRoutes);
router.use(authenticateRoutes);

export { router }; 
