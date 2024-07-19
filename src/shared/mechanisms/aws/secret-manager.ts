import { GetSecretValueResponse, SecretsManager } from '@aws-sdk/client-secrets-manager';

import { getEnv } from '@core/constants';

import { IntegrationError } from '@shared/errors';

export class SecretManagerAmazon {
  static getInstance (): SecretsManager {
    const instance: SecretsManager = new SecretsManager({
      credentials: {
        accessKeyId: getEnv().aws.accessKey,
        secretAccessKey: getEnv().aws.secretKey,
      },
      region: getEnv().aws.secretManager.region,
    });

    return instance;
  }

  static async getSecret (secretId: string): Promise<unknown> {
    let response = null;

    try {
      const instance = SecretManagerAmazon.getInstance();
      response = await instance.getSecretValue({ SecretId: secretId });

      response = SecretManagerAmazon.parseSecret(response);

    } catch (err) {
      throw new IntegrationError('amazon-secret-manager', err);
    }

    return response;
  }

  static parseSecret (secret: GetSecretValueResponse) {
    const { SecretString } = secret;

    if (SecretString) {
      return JSON.parse(SecretString);
    }
  }
}