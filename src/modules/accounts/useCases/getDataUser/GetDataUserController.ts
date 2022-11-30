import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetDataUserUseCase } from './GetDataUserUseCase';


export class GetDataUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    
    const getDataUserUseCase = container.resolve(GetDataUserUseCase);

    const user = await getDataUserUseCase.execute(userId);

    return res.json(user);
  }
}