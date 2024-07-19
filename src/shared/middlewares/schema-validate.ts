import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

import { ICustomRequest } from '@core/models/custom-request';

import { SchemaError } from '@shared/errors';
import { handleError } from '@shared/middlewares/handle-error';

/**
 * Middleware to validate schema.
 *
 * @param {Express.Request} req Express.Request.
 * @param {Express.Response} res Express.Response
 * @param {Express.Next} next Express.Next
 * @returns {NextFunction} Express.Next
 */
export function schemaValidate () {
  return async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new SchemaError(errors);
      }

      return next();
    } catch (err) {
      return handleError(err, req, res);
    }
  };
}
