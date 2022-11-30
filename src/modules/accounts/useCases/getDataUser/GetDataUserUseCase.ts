import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';


@injectable()
export class GetDataUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found')
    }

    return user;
  }
 }