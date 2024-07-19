import { Response } from 'express';
import httpStatus from 'http-status';

import APM from '@src/apm';

import { getEnv } from '@core/constants';
import { ICustomRequest } from '@core/models/custom-request';

import {
  BusinessError,
  ForbiddenError,
  SchemaError,
  UnauthorizedError,
} from '@shared/errors';
import LoggerManager from '@shared/log/manager';
import SlackService from '@shared/mechanisms/slack/service';

export function handleError (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: ICustomRequest,
  res: Response
) {
  APM.captureError(String(err));

  if (err instanceof BusinessError && err.isBusinessError) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.code,
      options: err.options,
    });

    return;
  }

  if (err instanceof UnauthorizedError && err.isUnauthorizedError) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }

  if (err instanceof ForbiddenError && err.isForbiddenError) {
    res.sendStatus(httpStatus.FORBIDDEN);
    return;
  }

  if (err instanceof SchemaError && err.isSchemaError) {
    res.status(httpStatus.BAD_REQUEST).json({
      isSchemaError: err.isSchemaError,
      errors: err.validation.array({
        onlyFirstError: true,
      }),
    });

    return;
  }

  LoggerManager.log('application-errors', {
    err,
    type: 'error',
    req: {
      requestId: req.headers['X-Request-ID'],
      originalUrl: req.originalUrl,
      baseUrl: req.baseUrl,
      method: req.method,
      urlPath: req.path,
      urlQuery: req.query,
    },
  });

  if (getEnv().env !== 'production') {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      ...err,
      stack: err.stack,
      message: err.message,
    });

    return;
  }

  SlackService.sendAttachments([
    {
      color: '#CC3980',
      fields: [
        {
          title: 'Project',
          value: 'Backend TS Typeorm',
          short: false,
        },
        {
          title: 'Request ID',
          value: req.headers['X-Request-ID'] as string,
          short: false,
        },
        {
          title: 'URL',
          value: req.originalUrl,
          short: true,
        },
        {
          title: 'Request Method',
          value: req.method,
          short: true,
        },
        {
          title: 'HTTP Status',
          value: httpStatus.INTERNAL_SERVER_ERROR.toString(),
          short: true,
        },
      ],
    },
  ]);

  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}