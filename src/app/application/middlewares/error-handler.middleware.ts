import { AppError } from '@application/errors/app-error.error';
import { BadRequestError } from '@application/errors/bad-request.error';
import { NotFoundError } from '@application/errors/not-found.error';
import { NextFunction, Request, Response } from 'express';

export const ErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      error: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      error: err.name,
      message: err.message,
    });
  }

  console.log(err);
  res.status(500).json({ status: 500, message: 'Internal Server Error' });
};
