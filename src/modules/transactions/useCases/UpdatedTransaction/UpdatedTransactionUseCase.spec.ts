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
} from '../createTransaction/CreateTransactionUseCase';

import {
  IUpdateTransactionDTO,
} from '@modules/transactions/dtos/IUpdateTransactionDTO';

import {
  UpdatedTransactionUseCase,
} from './UpdatedTransactionUseCase';

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryTransactionRepository: InMemoryTransactionRepository;
let createTransactionUseCase: CreateTransactionUseCase;
let updatedTransactionUseCase: UpdatedTransactionUseCase
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Updated Transaction', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    createTransactionUseCase = new CreateTransactionUseCase(
      inMemoryUserRepository,
      inMemoryTransactionRepository,
    );
    updatedTransactionUseCase = new UpdatedTransactionUseCase(
      inMemoryTransactionRepository,
    );
  });

  it('Should be able to update a transaction', async () => {
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

    const transactionUpdate: IUpdateTransactionDTO = {
      transactionId: transactionCreated.id,
      title: 'test updated',
      amount: 400.00,
      category: 'test updated',
      type: 'testing updated',
    }

    const transactionUpdated = await updatedTransactionUseCase.execute({
      transactionId: transactionUpdate.transactionId,
      title: transactionUpdate.title,
      amount: transactionUpdate.amount,
      category: transactionUpdate.category,
      type: transactionUpdate.type,
    });

    const transactionInUserIndex = userCreated.transactions.findIndex(
      (transaction) => transaction.id === transactionUpdated.id
    );

    if (transactionInUserIndex > -1) {
      userCreated.transactions.splice(transactionInUserIndex, 1, transactionUpdated);
    }

    expect(transactionUpdated.id).toBe(transactionCreated.id);

    expect(userCreated.transactions.length).toBe(1);

    expect(userCreated.transactions[0]).toEqual(
      expect.objectContaining({
        id: transactionUpdated.id,
        title: transactionUpdate.title,
        amount: transactionUpdate.amount,
        category: transactionUpdate.category,
        type: transactionUpdate.type,
      })
    );
  });

  it('Should not be able to update a transaction if transaction not found', async () => {
    expect(async () => {
      const transactionUpdate: IUpdateTransactionDTO = {
        title: 'test error',
        amount: 200.00,
        category: 'test error',
        type: 'testing error',
        transactionId: uuidV4(),
      }
  
      await updatedTransactionUseCase.execute({
        transactionId: transactionUpdate.transactionId,
        title: transactionUpdate.title,
        amount: transactionUpdate.amount,
        category: transactionUpdate.category,
        type: transactionUpdate.type,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});