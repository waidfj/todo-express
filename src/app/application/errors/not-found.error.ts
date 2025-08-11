import { AppError } from './app-error.error';

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'Not Found';
  }
}
