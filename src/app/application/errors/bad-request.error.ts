import { AppError } from './app-error.error';

export class BadRequestError extends AppError {
  errors: string[];
  constructor(message: string, errors: string[]) {
    super(message, 400);
    this.name = 'Bad Request';
    this.errors = errors;
  }
}
