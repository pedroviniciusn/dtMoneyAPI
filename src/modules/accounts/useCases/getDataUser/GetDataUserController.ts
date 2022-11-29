import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetDataUserUseCase } from './GetDataUserUseCase';


export class GetDataUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getDataUserUseCase = container.resolve(GetDataUserUseCase);

    const user = await getDataUserUseCase.execute(id);

    return res.json(user);
  }
}