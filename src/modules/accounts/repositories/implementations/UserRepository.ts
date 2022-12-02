import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/app-data-source';
import { Transactions } from '../../../transactions/entities/Transactions';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IUpdateUserPasswordDTO } from '../../dtos/IUpdateUserPasswordDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;
  private transactionsRepository: Repository<Transactions>;

  constructor() {
    this.repository = myDataSource.getRepository(User);
    this.transactionsRepository = myDataSource.getRepository(Transactions);
  }

  async updatePassword({
    userId,
    password,
    newPassword,
  }: IUpdateUserPasswordDTO): Promise<void> {
    await this.repository.update(userId, {
      password: newPassword,
    })
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
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.repository.findOneBy({
      id: userId,
    })
    
    await this.repository.update(userId, {
      name: name ? name : user.name,
      email: email ? email : user.email,
    })
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
        password: true,
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
}

export { UserRepository };
