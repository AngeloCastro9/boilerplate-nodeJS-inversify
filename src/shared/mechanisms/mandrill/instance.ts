import Axios from 'axios';

import { getEnv } from '@core/constants';

import { addLoggers } from '@shared/utils';

const instance = Axios.create({
  baseURL: getEnv().mailing.mandrill.url,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export function getInstance () {
  return addLoggers(instance, 'mandrill');
}