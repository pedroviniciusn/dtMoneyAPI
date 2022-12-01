import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
import { User } from '../entities/User';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO): Promise<void>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string): Promise<User>;
}

export { IUserRepository };
