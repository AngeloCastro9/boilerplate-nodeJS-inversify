import { NextFunction, Response } from 'express';

import { ICustomRequest } from '@core/models/custom-request';

import { ForbiddenError } from '@shared/errors';

/**
 * Middleware to authorize user using his profile
 *
 * @export
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 * @returns void
 */
export function authorize (profileTypes: string[]) {
  return async (req: ICustomRequest, _res: Response, next: NextFunction) => {
    try {
      const hasAccess = req.session.profileType
        && profileTypes.some(profileType => profileType === req.session.profileType);

      if (!hasAccess) {
        throw new ForbiddenError();
      }

      return next();
    } catch (err) {
      return next(err);
    }
  };
}