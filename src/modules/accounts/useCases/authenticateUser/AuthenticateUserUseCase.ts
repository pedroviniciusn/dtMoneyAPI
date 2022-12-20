import { inject, injectable } from 'tsyringe';

import { sign } from 'jsonwebtoken';

import { compare } from 'bcryptjs';

import {
  IUserRepository,
} from '@modules/accounts/repositories/IUserRepository';

import {
  AppError,
} from '@errors/AppError';


interface IRquest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IRquest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, '56ebb4604b372d83bb869862c65c9fbd', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}