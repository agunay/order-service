import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Resource not found');
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Resource not found' }];
  }
}
