import { Router } from 'express';
import { userRoutes } from './user.router';

const router = Router();

router.use('/users', userRoutes)

export { router }; 
