import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  CreateUserController 
} from '../modules/accounts/useCases/createUserAccount/CreateUserAccountCrontroller';

import { 
  DeleteUserAccountController 
} from '../modules/accounts/useCases/deleteUserAccount/DeleteUserAccountController';

import { 
  GetDataUserController 
} from '../modules/accounts/useCases/getDataUser/GetDataUserController';

import { 
  GetUserTransactionsController 
} from '../modules/accounts/useCases/getUserTransactions/GetUserTransactionsController';

import { 
  UpdatedUserController 
} from '../modules/accounts/useCases/updatedUser/UpdatedUserController';

import { 
  UpdatedUserPasswordController 
} from '../modules/accounts/useCases/updatedUserPassword/UpdatedUserPasswordController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updatedUserController = new UpdatedUserController();
const updatedUserPasswordController = new UpdatedUserPasswordController();
const getDataUserController = new GetDataUserController();
const getUserTransactionsController = new GetUserTransactionsController();
const deleteUserAccountController = new DeleteUserAccountController();

userRoutes.post(
  '/create_user', 
  createUserController.handle
);

userRoutes.put(
  '/me/update_user', 
  ensureAuthenticated, 
  updatedUserController.handle
);

userRoutes.patch(
  '/me/update_password', 
  ensureAuthenticated, 
  updatedUserPasswordController.handle
);

userRoutes.get(
  '/me',
  ensureAuthenticated, 
  getDataUserController.handle
);

userRoutes.get(
  '/me/transactions', 
  ensureAuthenticated, 
  getUserTransactionsController.handle
);

userRoutes.delete(
  '/me/delete_accocunt', 
  ensureAuthenticated, 
  deleteUserAccountController.handle
);

export { userRoutes };
