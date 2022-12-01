import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserAccountUseCase } from './DeleteUserAccountUseCase';


export class DeleteUserAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;

    const deleteUserAccountUseCase = container.resolve(DeleteUserAccountUseCase);

    await deleteUserAccountUseCase.execute(userId);

    return res.status(200).json({
      message: 'Account deleted!'
    })
  }
}