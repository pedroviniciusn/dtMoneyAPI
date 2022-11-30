import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/app-data-source';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = myDataSource.getRepository(User);
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
    password,
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.repository.findOneBy({
      id: userId,
    })
    
    await this.repository.update(userId, {
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? password : user.password,
    })
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
}

export { UserRepository };
