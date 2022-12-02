import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatedUserPasswordUseCase } from './UpdatedUserPasswordUseCase';


export class UpdatedUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    
    const {
      password,
      newPassword,
    } = req.body;

    const updatedUserPasswordUseCase = container.resolve(UpdatedUserPasswordUseCase);

    await updatedUserPasswordUseCase.execute({
      userId,
      password,
      newPassword,
    });

    return res.status(200).send();
  }
}