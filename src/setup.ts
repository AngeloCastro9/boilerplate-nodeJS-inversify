import * as bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, NextFunction, Response } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { InversifyExpressServer } from 'inversify-express-utils';
import { v4 } from 'uuid';

import { ICustomRequest } from '@core/models/custom-request';

import { SwaggerHelper } from '@shared/helpers';
import RateLimitService from '@shared/mechanisms/rate-limit/service';
import { handleError, operationLogger, validateApiKey } from '@shared/middlewares';

export function initializeApp (server: InversifyExpressServer): Application {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server.setConfig((app: Application) => {
    // add body parser
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: '500mb',
      })
    );

    app.use(
      bodyParser.json({
        limit: '500mb',
      })
    );

    // add compress
    app.use(compress());

    // secure apps by setting various HTTP headers
    app.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    app.use(cors());

    // add cookie parser
    app.use(cookieParser());

    // enable rate limit
    RateLimitService.addRateLimit(app);

    // enable documentation
    SwaggerHelper.initializeDocs(app);

    // enable operation logger
    app.use((req, _res, next) => operationLogger(req as unknown as ICustomRequest, _res, next));

    // enable global validate api key
    app.use((req, res, next) => validateApiKey(req as unknown as ICustomRequest, res, next));

    app.use((req: ICustomRequest, _res: Response, next: NextFunction) => {
      req.headers['X-Request-ID'] = v4();
      next();
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server.setErrorConfig((app: any) => {
    // catch 404 and forward to error handler
    app.use((_req: Request, res: Response): void => {
      res.status(httpStatus.NOT_FOUND).json();
    });

    // Handle 500
    // do not remove next from line bellow, error handle will not work
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    app.use((err: any, req: ICustomRequest, res: Response, _next: NextFunction): void => handleError(err, req, res));
  });

  return server.build();
}