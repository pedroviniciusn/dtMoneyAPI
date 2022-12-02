import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUpdateUserPasswordDTO } from '../../dtos/IUpdateUserPasswordDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class UpdatedUserPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    userId,
    password,
    newPassword,
  }: IUpdateUserPasswordDTO): Promise<void> {

    const user = await this.userRepository.findById(userId);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password incorrect')
    }

    const newPasswordMacth = await compare(newPassword, user.password);

    if (newPasswordMacth) {
      throw new AppError('Passwords cannot be the same')
    }

    const passwordHash = await hash(newPassword, 8);

    await this.userRepository.updatePassword({
      userId,
      newPassword: passwordHash,
    })
  }
}