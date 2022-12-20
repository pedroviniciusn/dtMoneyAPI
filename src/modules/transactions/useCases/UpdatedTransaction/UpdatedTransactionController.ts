import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { UpdatedTransactionUseCase } from './UpdatedTransactionUseCase';

export class UpdatedTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: transactionId } = req.params;

    const {
      title,
      amount,
      category,
      type,
    } = req.body;

    const updatedTransactionUseCase = container.resolve(UpdatedTransactionUseCase);

    await updatedTransactionUseCase.execute({
      transactionId,
      title,
      amount,
      category,
      type,
    });

    return res.status(200).json({
      message: 'Transaction updated successful.'
    });
  }
}