import { Router } from 'express';

import { 
  CreateUserController 
} from '../modules/accounts/useCases/createUser/CreateUserCrontroller';
import { 
  UpdatedUserController 
} from '../modules/accounts/useCases/updatedUser/UpdatedUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updatedUserController = new UpdatedUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/:id', updatedUserController.handle)

export { userRoutes };
