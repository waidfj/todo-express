import { BadRequestError } from '@application/errors/bad-request.error';
import { validate, ValidationError } from 'class-validator';

export class DtoValidator {
  static async validateDto(dtoObject: Object): Promise<void> {
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      throw new BadRequestError('Input validation failed', this.createErrorMessages(errors));
    }
  }

  private static createErrorMessages(errors: ValidationError[]): string[] {
    const errorMessages: string[] = [];

    errors.forEach((err) => {
      if (err.constraints) {
        Object.values(err.constraints).forEach((message) => {
          errorMessages.push(message);
        });
      } else {
        errorMessages.push('Unknown validation error');
      }
    });

    return errorMessages;
  }
}
