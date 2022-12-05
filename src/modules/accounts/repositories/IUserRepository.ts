import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO';
import { IUpdateUserPasswordDTO } from '../dtos/IUpdateUserPasswordDTO';
import { User } from '../entities/User';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO): Promise<void>;
  updatePassword(data: IUpdateUserPasswordDTO): Promise<void>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(userId: string): Promise<User>;
  findByIdAndGetPassword(userId: string): Promise<User>;
}

export { IUserRepository };
