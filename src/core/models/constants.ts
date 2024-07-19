import { Environments } from '@shared/enumerators';

export interface IConstants {
  env: Environments;
  debug: boolean;
  appName: string;
  appKey: string;
  timezone: string;
  locale: string;
  port: number;

  database: {
    hostWrite: string;
    port: number;
    name: string;
    user: string;
    password: string;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };

  rateLimit: {
    enabled: boolean;

    general: {
      windowMs: number;
      max: number;
    };

    critical: {
      windowMs: number;
      max: number;
      endpoints: string[];
    };
  };

  keycloak: {
    baseURL: string;
    publicKey: string;
    grantType: string;

    client: {
      id: string;
      secret: string;
    };

    realm: {
      url: string;
      name: string;
    };
  };

  aws: {
    accessKey: string;
    secretKey: string;

    cloudwatch: {
      region: string;
    };

    bucket: {
      region: string;
      name: string;
      expires: number;
    };

    secretManager: {
      region: string;
    };
  };

  multer: {
    fileSize: number;
  };

  slack: {
    enabled: boolean;
    webhookUrl: string;
  };

  mailing: {
    provider: string;

    mandrill: {
      url?: string;

      from: {
        name?: string;
        address?: string;
      };
    };

    sendgrid: {
      apiKey?: string;

      from: {
        address?: string;
      };
    };

    smtp: {
      host?: string;
      port?: number;
      secure?: boolean;

      auth: {
        user?: string;
        password?: string;
      };

      from: {
        name?: string;
        address?: string;
      };
    }
  };

  lambda: {
    url: string;
  };
}

export interface IEnvironmentSecrets {
  NODE_ENV: string;
  APP_NAME: string;
  APP_API_KEY: string;
  DEBUG: string;
  TIMEZONE: string;
  locale: string;
  PORT: string;

  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_POOL_MAX: string;
  DATABASE_POOL_MIN: string;
  DATABASE_ACQUIRE: string;
  DATABASE_IDLE: string;

  RATE_LIMIT_ENABLED: string;
  RATE_LIMIT_GENERAL_WINDOW_MS: string;
  RATE_LIMIT_GENERAL_MAX: string;
  RATE_LIMIT_CRITICAL_WINDOW_MS: string;
  RATE_LIMIT_CRITICAL_MAX: string;
  RATE_LIMIT_CRITICAL_ENDPOINTS: string;

  MULTER_FILE_SIZE: string;

  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  AWS_CLOUDWATCH_REGION: string;
  AWS_S3_BUCKET_REGION: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_S3_BUCKET_EXPIRES: string;
  AWS_SECRET_MANAGER_CONSTANTS: string;
  AWS_SECRET_MANAGER_REGION: string;

  KEYCLOAK_BASE_URL: string;
  KEYCLOAK_PUBLIC_KEY: string;
  KEYCLOAK_GRANT_TYPE: string;
  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_CLIENT_SECRET: string;
  KEYCLOAK_REALM_URL: string;
  KEYCLOAK_REALM_NAME: string;

  SLACK_WEBHOOK_URL: string;
  SLACK_WEBHOOK_ENABLED: string;

  MAILING_PROVIDER: string;

  MANDRILL_BASE_URL: string;
  SENDGRID_API_KEY: string;

  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_SECURE: string;
  SMTP_AUTH_USER: string;
  SMTP_AUTH_PASSWORD: string;
  SMTP_FROM_NAME: string;
  SMTP_FROM_ADDRESS: string;
}
