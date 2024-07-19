import { Result, ValidationError } from 'express-validator';
import { CustomError } from 'ts-custom-error';

export class SchemaError extends CustomError {
  public readonly message: string;
  public readonly validation: Result<ValidationError>;
  isSchemaError = true;

  constructor (validation: Result<ValidationError>, message?: string) {
    super();
    this.validation = validation;
    this.message = message;
  }
}

export const SchemaErrorCodes = {
  INVALID_EMAIL_FORMAT: 'invalid_email_format',
};