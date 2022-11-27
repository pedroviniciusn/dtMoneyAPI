import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/app-data-source';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

class userRepository implements IUserRepository {
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
  
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ 
      email: email
     });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({
      id: id
    })

    return user;
  }
}

export { userRepository };
