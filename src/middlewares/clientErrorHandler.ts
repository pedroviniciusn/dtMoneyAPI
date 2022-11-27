import * as express from 'express'
import { AppError } from '../errors/AppError';

export function clientErrorHandler(
  err: Error, 
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction,
  ) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: `Internal server error ${err.message}`,
    });
  }
