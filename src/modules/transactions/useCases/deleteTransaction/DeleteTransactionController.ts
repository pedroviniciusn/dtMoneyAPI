import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { DeleteTransactionUseCase } from './DeleteTransactionUseCase';

export class DeleteTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: transactionId } = req.params;

    const deleteTransactionUseCase = container.resolve(DeleteTransactionUseCase);

    await deleteTransactionUseCase.execute(transactionId);

    return res.status(200).json({
      message: 'Transaction deleted!'
    });
  }
}