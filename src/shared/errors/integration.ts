import { CustomError } from 'ts-custom-error';

import LoggerManager from '@shared/log/manager';

export class IntegrationError extends CustomError {
  isIntegrationError = true;
  mechanism: string;
  options: unknown;

  constructor (mechanism: string, options: unknown) {
    super();
    this.mechanism = mechanism;
    this.options = options;

    LoggerManager.log('application-errors', {
      origin: 'integration',
      mechanism,
      type: 'error',
      err: options,
    });
  }
}
