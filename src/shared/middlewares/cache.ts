import { NextFunction, Response } from 'express';

import { ICustomRequest } from '@core/models/custom-request';

import { getCacheByKey } from '@shared/utils';

/**
 * Middlewate to has cache from request
 * @param {Express.Request} req
 * @param {Express.Response} _res
 * @param {Express.Next} next
 * @returns void
 */
export function hasCache (key: string) {
  return (_req: ICustomRequest, res: Response, next: NextFunction) => {
    const cache = getCacheByKey(key);

    if (cache) return res.json(cache);

    return next();
  };
}

/**
 * Middlewate to has details cache from request
 * @param {Express.Request} req
 * @param {Express.Response} _res
 * @param {Express.Next} next
 * @returns void
 */
export function hasDetailsCache (key: string) {
  return (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const cache = getCacheByKey(`${key}-${id}`);

    if (cache) return res.json(cache);

    return next();
  };
}
