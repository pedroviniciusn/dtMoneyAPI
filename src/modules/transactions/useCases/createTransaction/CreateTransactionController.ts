import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransactionUseCase } from './CreateTransactionUseCase';

export class CreateTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const {
      title,
      amount,
      category,
      type,
    } = req.body;

    const createTransactionUseCase = container.resolve(CreateTransactionUseCase);

    await createTransactionUseCase.execute({
      id,
      title,
      amount,
      category,
      type
    });

    return res.status(201).send();
  }
} 