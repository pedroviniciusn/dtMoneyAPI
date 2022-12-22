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

import { DeleteTransactionUseCase } from './DeleteTransactionUseCase';


let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryTransactionRepository: InMemoryTransactionRepository;
let createTransactionUseCase: CreateTransactionUseCase;
let deleteTransactionUseCase: DeleteTransactionUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Delete Transaction', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);
    inMemoryTransactionRepository = new InMemoryTransactionRepository();
    createTransactionUseCase = new CreateTransactionUseCase(
      inMemoryUserRepository,
      inMemoryTransactionRepository,
    );
    deleteTransactionUseCase = new DeleteTransactionUseCase(
      inMemoryTransactionRepository,
    );
  });

  it('Should be able to delete a transaction', async () => {
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

    await deleteTransactionUseCase.execute(transactionCreated.id);

    const transactionInUserIndex = userCreated.transactions.findIndex((transaction) => transaction.id === transactionCreated.id);

    if (transactionInUserIndex > -1) {
      userCreated.transactions.splice(transactionInUserIndex);
    }

    const transactiondeleted = await inMemoryTransactionRepository.findById(transactionCreated.id);
    
    expect(transactiondeleted).toBeUndefined();

    expect(userCreated.transactions.length).toBe(0);
  });

  it('Should not be able to delete a transaction if transaction not found', async () => {
    expect(async () => {
      const id = uuidV4();
      
      await deleteTransactionUseCase.execute(id);
    }).rejects.toBeInstanceOf(AppError);
  });
});