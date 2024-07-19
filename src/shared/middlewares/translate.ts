import { NextFunction, Response } from 'express';

import { ICustomRequest } from '@core/models/custom-request';
import { Dictionary } from '@core/models/dictionary';

import { renameJSONKeysRecursively } from '@shared/utils';

export function translateRequestBody (translation: Dictionary<string>) {
  return async (req: ICustomRequest, _res: Response, next: NextFunction) => {
    try {
      renameJSONKeysRecursively(req.body, translation);
      return next();
    } catch (err) {
      return next(err);
    }
  };
}