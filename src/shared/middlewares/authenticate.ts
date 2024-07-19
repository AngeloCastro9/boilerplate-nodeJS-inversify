import { NextFunction, Response } from 'express';
import { getRepository } from 'typeorm';

import { AuthContract } from '@core/contracts';
import { UserEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';

import { UnauthorizedError } from '@shared/errors';

/**
 * Middleware to authenticate user using jwt token
 *
 * @export
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 * @returns void
 */

export async function authenticate (req: ICustomRequest, _res: Response, next: NextFunction): Promise<void> {
  const authContract = new AuthContract();
  const userRepository = getRepository(UserEntity);

  try {
    if (!req.headers || !req.headers.authorization) {
      throw new UnauthorizedError();
    }

    const [ bearer, token ] = req.headers.authorization.split(' ');

    if (!/^Bearer$/i.test(bearer) || !token) {
      throw new UnauthorizedError();
    }

    const { active, sub, email } = await authContract.verifyAccess({ token });

    if (!active) throw new UnauthorizedError();

    const user = await userRepository.findOne({
      where: { id: sub, email },
    });

    if (!user) throw new UnauthorizedError();

    req.session = user;

    return next();
  } catch (err) {
    return next(err);
  }
}
