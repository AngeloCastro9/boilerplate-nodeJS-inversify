import { NextFunction, Response } from 'express';

import { ICustomRequest } from '@core/models/custom-request';

import { ProfileType } from '@shared/enumerators';
import { ForbiddenError } from '@shared/errors';

const ProfilesCanManagerUser = [
  ProfileType.ADMINISTRATOR,
];

export function canManageUserInParams () {
  return (req: ICustomRequest, _res: Response, next: NextFunction) => {
    if (ProfilesCanManagerUser.includes(req.session?.profileType)) {
      return next();
    }

    if (req.params?.id === req.session?.id) {
      return next();
    }

    return next(new ForbiddenError());
  };
}

export function canManageUserInQuery () {
  return (req: ICustomRequest, _res: Response, next: NextFunction) => {
    if (ProfilesCanManagerUser.includes(req.session?.profileType)) {
      return next();
    }

    if (req.query?.userId === req.session?.id) {
      return next();
    }

    return next(new ForbiddenError());
  };
}

export function canManageUserInBody () {
  return (req: ICustomRequest, _res: Response, next: NextFunction) => {
    if (ProfilesCanManagerUser.includes(req.session?.profileType)) {
      return next();
    }

    if (req.body?.userId === req.session?.id) {
      return next();
    }

    return next(new ForbiddenError());
  };
}
