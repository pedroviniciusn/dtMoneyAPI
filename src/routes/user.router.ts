import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { 
  CreateUserController 
} from '../modules/accounts/useCases/createUser/CreateUserCrontroller';
import { GetDataUserController } from '../modules/accounts/useCases/getDataUser/GetDataUserController';
import { 
  UpdatedUserController 
} from '../modules/accounts/useCases/updatedUser/UpdatedUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updatedUserController = new UpdatedUserController();
const getDataUserController = new GetDataUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/', ensureAuthenticated, updatedUserController.handle);
userRoutes.get('/', ensureAuthenticated, getDataUserController.handle);

export { userRoutes };
