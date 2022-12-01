import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  CreateUserController 
} from '../modules/accounts/useCases/createUser/CreateUserCrontroller';

import { 
  GetDataUserController 
} from '../modules/accounts/useCases/getDataUser/GetDataUserController';

import { 
  GetUserTransactionsController 
} from '../modules/accounts/useCases/getUserTransactions/GetUserTransactionsController';

import { 
  UpdatedUserController 
} from '../modules/accounts/useCases/updatedUser/UpdatedUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updatedUserController = new UpdatedUserController();
const getDataUserController = new GetDataUserController();
const getUserTransactionsController = new GetUserTransactionsController();

userRoutes.post('/create_user', createUserController.handle);
userRoutes.put('/update_user', ensureAuthenticated, updatedUserController.handle);
userRoutes.get('/me', ensureAuthenticated, getDataUserController.handle);
userRoutes.get('/me/transactions', ensureAuthenticated, getUserTransactionsController.handle);

export { userRoutes };
