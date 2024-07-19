import { BaseHttpController, controller, httpGet, interfaces } from 'inversify-express-utils';
import { DateTime } from 'luxon';

import { getEnv } from '@core/constants';
import { IHealthStatus } from '@core/models/utils';

import { getMemoryUsage, msToTime } from '@shared/utils';

const startedAt = DateTime.now().toMillis();

@controller('/health')
export class HealthController extends BaseHttpController implements interfaces.Controller {
  constructor () {
    super();
  }

  @httpGet('/status')
  public healthStatus (): IHealthStatus {
    return {
      app: getEnv().appName,
      env: getEnv().env,
      uptime: msToTime(DateTime.now().toMillis() - startedAt),
      now: DateTime.now().toISO(),
      memory: getMemoryUsage(),
    };
  }
}
