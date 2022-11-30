import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class UpdatedUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: IUpdateUserDTO): Promise<void> {
    const user = this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }
    
    if (password) {
      const passwordHash = await hash(password, 8)
      password = passwordHash;
    }
    

    await this.userRepository.update({
      userId,
      name,
      email,
      password: password,
    })
  }
}