import { IUserRepository } from '../../repositories/IUserRepository';


class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {}
}