import './core/module-alias';
import '@src/apm';

import { Server } from '@src/server';

import { initializeConstants } from '@core/constants';
import { initializeDatabase } from '@core/db/database';

import { logError } from '@shared/log/console';

async function bootstrap (): Promise<void> {
  initializeConstants();
  await initializeDatabase();

  new Server();
}

bootstrap().catch((err) => logError(`bootstrap: ${err.message}`));
