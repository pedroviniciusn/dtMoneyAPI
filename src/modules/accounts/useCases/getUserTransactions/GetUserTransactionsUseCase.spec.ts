import { v4 as uuidV4 } from 'uuid';

import { AppError } from '@errors/AppError';

import {
  ICreateUserDTO,
} from '@modules/accounts/dtos/ICreateUserDTO';

import {
  InMemoryUserRepository,
} from '@modules/accounts/repositories/implementations/in-memory/InMemoryUserRepository';

import {
  AuthenticateUserUseCase,
} from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

import {
  CreateUserUseCase,
} from '@modules/accounts/useCases/createUser/CreateUserUseCase';

import {
  ICreateTransactionsDTO,
} from '@modules/transactions/dtos/ICreateTransactionsDTO';

import {
  InMemoryTransactionRepository,
} from '@modules/transactions/repositories/implementations/in-memory/InMemoryTransactionRepository';

import {
  CreateTransactionUseCase,
} from '@modules/transactions/useCases/createTransaction/CreateTransactionUseCase';
import { GetUserTransactionsUseCase } from './GetUserTransactionsUseCase';


let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryTransactionRepository: InMemoryTransactionRepository;
let createTransactionUseCase: CreateTransactionUseCase;
let getUserTransactionsUseCase: GetUserTransactionsUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Get Transactions From User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    createTransactionUseCase = new CreateTransactionUseCase(
      inMemoryUserRepository,
      inMemoryTransactionRepository,
    );
    getUserTransactionsUseCase = new GetUserTransactionsUseCase(
      inMemoryUserRepository
    );
  });

  it('Should be able to get all transactions from user', async () => {
    const user : ICreateUserDTO = {
      name: 'User',
      email: 'user@user.com',
      password: 'test123'
    }

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const userCreated = await inMemoryUserRepository.findByEmail(result.user.email);

    const transaction: ICreateTransactionsDTO = {
      title: 'test',
      amount: 200.00,
      category: 'test',
      type: 'testing',
      userId: userCreated.id,
    }

    const transactionCreated = await createTransactionUseCase.execute({
      userId: transaction.userId,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    });

    userCreated.transactions = [transactionCreated];

    const allTransactions = await getUserTransactionsUseCase.execute(userCreated.id);

    expect(userCreated.transactions.length).toBe(1);

    expect(allTransactions[0]).toEqual(
      expect.objectContaining({
        id: transactionCreated.id,
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
      })
    );
  });

  it('Should not be able to get all transactions if user not found', async () => {
    expect(async () => {
      const id = uuidV4();

      await getUserTransactionsUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to get all transactions if transactions an nonexistent', async () => {
    expect(async () => {
      const user : ICreateUserDTO = {
        name: 'User Error',
        email: 'user@error.com',
        password: 'test123'
      }
  
      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
  
      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      });
  
      const userCreated = await inMemoryUserRepository.findByEmail(result.user.email);
  
      await getUserTransactionsUseCase.execute(userCreated.id);
    }).rejects.toBeInstanceOf(AppError);
  });
});