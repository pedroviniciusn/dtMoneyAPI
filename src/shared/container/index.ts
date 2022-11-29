import { container } from 'tsyringe';

import { 
  IUserRepository 
} from '../../modules/accounts/repositories/IUserRepository';

import { 
  UserRepository
} from '../../modules/accounts/repositories/implementations/UserRepository';

import { 
  ITransactionsRepository
} from '../../modules/transactions/repositories/ITransactionRepository';

import { 
  TransactionsRepository 
} from '../../modules/transactions/repositories/implementations/TransactionRepository';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionRepository',
  TransactionsRepository,
)
