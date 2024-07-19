import { NextFunction, Response } from 'express';

import { getEnv } from '@core/constants';
import { ICustomRequest } from '@core/models/custom-request';

import { ForbiddenError } from '@shared/errors';

const PUBLIC_RESOURCES = [
  'docs',
  'health',
];

function validatePublicResourceAccess (url: string) {
  for (const resource of PUBLIC_RESOURCES) {
    if (url.includes(resource)) {
      return true;
    }
  }

  return false;
}

/**
 * Middlewate to validate api key
 * @param {Express.Request} req
 * @param {Express.Response} _res
 * @param {Express.Next} next
 * @returns void
 */
export function validateApiKey (req: ICustomRequest, _res: Response, next: NextFunction) {
  if (validatePublicResourceAccess(req.url)) return next();

  try {
    if (!req.headers) throw new ForbiddenError();

    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== getEnv().appKey) {
      throw new ForbiddenError();
    }

    return next();
  } catch (err) {
    return next(err);
  }
}
