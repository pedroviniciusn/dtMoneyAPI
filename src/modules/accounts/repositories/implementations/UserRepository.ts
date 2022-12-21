import {
  myDataSource,
} from '@database/app-data-source';

import {
  ICreateUserDTO,
} from '@modules/accounts/dtos/ICreateUserDTO';

import {
  IUpdateUserDTO,
} from '@modules/accounts/dtos/IUpdateUserDTO';

import {
  IUpdateUserPasswordDTO,
} from '@modules/accounts/dtos/IUpdateUserPasswordDTO';

import {
  User,
} from '@modules/accounts/entities/User';

import {
  Transactions,
} from '@modules/transactions/entities/Transactions';

import {
  Repository,
} from 'typeorm';

import {
  IUserRepository,
} from '../IUserRepository';


class UserRepository implements IUserRepository {
  private repository: Repository<User>;
  private transactionsRepository: Repository<Transactions>;

  constructor() {
    this.repository = myDataSource.getRepository(User);
    this.transactionsRepository = myDataSource.getRepository(Transactions);
  }

  async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password
    });

    await this.repository.save(user)
  }

  async update({
    userId,
    name,
    email,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
    });
    
    await this.repository.update(user.id, {
      name: name ? name : user.name,
      email: email ? email : user.email,
    });

    return user;
  }

  async updatePassword({
    userId,
    password,
    newPassword,
  }: IUpdateUserPasswordDTO): Promise<void> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
    });

    await this.repository.update(user.id, {
      password: newPassword,
    });
  }

  async delete(userId: string): Promise<void> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
      
      relations: {
        transactions: true,
      }
    })

    if (user.transactions) {
      await this.transactionsRepository
      .createQueryBuilder('transactions')
      .delete()
      .from(Transactions)
      .where('userId = :userId', {userId: userId})
      .execute()
    }

    await this.repository.delete(userId);
  }
  
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ 
      where: {
        email: email,
      },
     });

    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.repository.findOne({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        created_at: false,
        updated_at: false,
        transactions: true,
      },

      where: {
        id: userId,
      },
      
      relations: {
        transactions: true,
      }
    })

    return user;
  }

  async findByIdAndGetPassword(userId: string): Promise<User> {
    const userPassword = await this.repository.findOne({
      select: {
        name: false,
        email: false,
        password: true,
        created_at: false,
        updated_at: false,
        transactions: false,
      },

      where: {
        id: userId
      }
    });

    return userPassword;
  }
}

export { UserRepository };
