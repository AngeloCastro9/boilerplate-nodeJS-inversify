import axios from 'axios';

import { getEnv } from '@core/constants';

import { GrantType } from '@shared/enumerators';
import { KeycloakInstance, KeycloakInstanceOptions } from '@shared/mechanisms/keycloak/dto';
import { addLoggers } from '@shared/utils';

export const getInstance = (options?: KeycloakInstanceOptions): KeycloakInstance => {
  const instance = axios.create({
    baseURL: getEnv().keycloak.baseURL,
    timeout: 30000,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': options?.contentType ?? 'application/json',
      ...options && options.token && {
        Authorization: `Bearer ${options.token}`,
      },
    },
  });

  const config = {
    grantType: GrantType.CLIENT_CREDENTIALS,
    clientId: getEnv().keycloak.client.id,
    clientSecret: getEnv().keycloak.client.secret,
    realmName: getEnv().keycloak.realm.name,
  };

  return {
    instance: addLoggers(instance, 'keycloak', true),
    config,
  };
};