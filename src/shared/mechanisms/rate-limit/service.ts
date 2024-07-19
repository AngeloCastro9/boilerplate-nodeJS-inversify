import { Application, NextFunction, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

import { getEnv } from '@core/constants';
import { ICustomRequest } from '@core/models/custom-request';

import LoggerManager from '@shared/log/manager';

class RateLimitService {
  log (origin: string, req: ICustomRequest) {
    LoggerManager.log('rate-limit', {
      origin,
      req,
    });
  }

  addRateLimit (application: Application): void {
    const { enabled, general, critical } = getEnv().rateLimit;

    const generalLimiter = rateLimit({
      windowMs: 1 * 60 * 1000 * general.windowMs,
      max: general.max,
      headers: false,
      keyGenerator (req: ICustomRequest): string {
        return (req.headers['x-real-ip'] || req.headers['x-forwarded-for']) as string;
      },
      handler: (req: ICustomRequest, _res: Response, next: NextFunction) => {
        this.log('rate-limit-critical', req);
        return next();
      },
    });

    const criticalLimiter = rateLimit({
      windowMs: 1 * 60 * 1000 * critical.windowMs,
      max: critical.max,
      headers: false,
      keyGenerator (req: ICustomRequest): string {
        return (req.headers['x-real-ip'] || req.headers['x-forwarded-for']) as string;
      },
      skip: (req: ICustomRequest): boolean => {
        return !(critical.endpoints && critical.endpoints.find((o) => o === req.path));
      },
      handler: (req: ICustomRequest, _res: Response, next: NextFunction) => {
        this.log('rate-limit-critical', req);
        return next();
      },
    });

    if (enabled) {
      application.use(generalLimiter);
      application.use(criticalLimiter);
    }
  }
}

export default new RateLimitService();
