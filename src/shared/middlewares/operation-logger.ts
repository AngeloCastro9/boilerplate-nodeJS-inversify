import { NextFunction, Response } from 'express';

import { ICustomRequest } from '@core/models/custom-request';

import LoggerManager from '@shared/log/manager';

/**
 * Middleware to log operation request
 *
 * @export
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 * @returns void
 */

export async function operationLogger (req: ICustomRequest, _res: Response, next: NextFunction) {
  LoggerManager.log('application-operations', {
    type: 'log',
    req: {
      requestId: req.headers['X-Request-ID'],
      originalUrl: req.originalUrl,
      baseUrl: req.baseUrl,
      path: req.path,
      query: req.query,
      method: req.method,
      params: req.params,
      body: req.body,
      headers: req.headers,
      ip: req.headers['x-real-ip'] || req.socket.remoteAddress || req.ip,
      user: req.session && req.session.id,
    },
  });

  const { send } = _res;

  _res.send = (data) => {
    LoggerManager.log('application-operations', {
      type: 'log',
      req: {
        requestId: req.headers['X-Request-ID'],
        originalUrl: req.originalUrl,
        baseUrl: req.baseUrl,
      },
      res: data,
    });

    _res.send = send;
    return _res.send(data);
  };

  return next();
}
