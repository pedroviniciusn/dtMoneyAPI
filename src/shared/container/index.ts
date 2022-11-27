import { container } from 'tsyringe';

import { 
  IUserRepository 
} from '../../modules/accounts/repositories/IUserRepository';

import { 
  userRepository
} from '../../modules/accounts/repositories/implementations/UserRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  userRepository
);