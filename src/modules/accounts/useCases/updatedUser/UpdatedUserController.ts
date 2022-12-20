import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { UpdatedUserUseCase } from './UpdatedUserUseCase';

export class UpdatedUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user

    const {
      name,
      email,
    } = req.body;

    const updatedUserUseCase = container.resolve(UpdatedUserUseCase);
    
    await updatedUserUseCase.execute({
      userId,
      name,
      email,
    })

    return res.status(200).json({
      message: 'Data updated successful.'
    });
  }
}