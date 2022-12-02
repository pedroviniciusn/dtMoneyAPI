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
  }: IUpdateUserDTO): Promise<void> {
    const user = this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    } 

    await this.userRepository.update({
      userId,
      name,
      email,
    })
  }
}