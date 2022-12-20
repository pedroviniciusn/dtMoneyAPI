import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { GetUserTransactionsUseCase } from './GetUserTransactionsUseCase';

export class GetUserTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;

    const getUserTransactionsUseCase = container.resolve(GetUserTransactionsUseCase);

    const userTransactions = await getUserTransactionsUseCase.execute(userId);

    return res.json(userTransactions);
  }
}