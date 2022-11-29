import { Router } from 'express';

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
userRoutes.put('/:id', updatedUserController.handle);
userRoutes.get('/:id', getDataUserController.handle);

export { userRoutes };
