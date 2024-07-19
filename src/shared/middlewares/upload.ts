import { NextFunction, Response } from 'express';
import Multer from 'multer';

import { getEnv } from '@core/constants';
import { ICustomRequest } from '@core/models/custom-request';

/**
 * Middleware to allow single file upload
 * @param {Express.Request} req
 * @param {Express.Response} _res
 * @param {Express.Next} next
 * @returns void
 */
export function uploadSingleFile (req: ICustomRequest, _res: Response, next: NextFunction) {
  const options: Multer.Options = {
    limits: {
      files: 1,
      fileSize: getEnv().multer.fileSize,
    },
  };

  const upload = Multer(options).single('file');

  return upload(req, _res, next);
}

/**
 * Middleware to allow multiple file upload
 * @param {Express.Request} req
 * @param {Express.Response} _res
 * @param {Express.Next} next
 * @returns void
 */
export function uploadMultipleFile (req: ICustomRequest, _res: Response, next: NextFunction) {
  const options: Multer.Options = {
    limits: {
      fileSize: getEnv().multer.fileSize,
    },
  };

  const upload = Multer(options).array('files');

  return upload(req, _res, next);
}
