import { CustomError } from 'ts-custom-error';

export class UnauthorizedError extends CustomError {
  isUnauthorizedError = true;

  constructor () {
    super();
  }
}
