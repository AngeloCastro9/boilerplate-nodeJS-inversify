import { CustomError } from 'ts-custom-error';

import { Dictionary } from '@core/models/dictionary';

export class BusinessError extends CustomError {
  code: string;
  options: Dictionary<string | number | boolean>;
  isBusinessError = true;

  constructor (code: string, options?: Dictionary<string | number | boolean>) {
    super(code);
    this.code = code;
    this.options = options;
  }
}

export const BusinessErrorCodes = {
  INVALID_ID: 'invalid_id',
  TEMPLATE_NOT_FOUND: 'template_not_found',
  USER_NOT_FOUND: 'user_not_found',
  USER_ALREADY_REGISTERED: 'user_already_registered',
};
