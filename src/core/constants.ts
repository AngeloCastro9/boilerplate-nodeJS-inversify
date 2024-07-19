import dotenv from 'dotenv';
import { Settings } from 'luxon';

import { IConstants, IEnvironmentSecrets } from '@core/models/constants';

import { Environments } from '@shared/enumerators';
import { logError, logInit } from '@shared/log/console';
import { SecretManagerAmazon } from '@shared/mechanisms/aws';
import ConstantsSchema from '@shared/validations/constants';

type ConstantsSchemaType = typeof ConstantsSchema._output;

dotenv.config();

export const overrideEnvironment = async (environmentSecret: string) => {
  const secret = await SecretManagerAmazon.getSecret(environmentSecret) as IEnvironmentSecrets;

  if (secret.NODE_ENV) {
    process.env.NODE_ENV = secret.NODE_ENV;
  }

  if (secret.DEBUG) {
    process.env.DEBUG = secret.DEBUG;
  }

  if (secret.TIMEZONE) {
    process.env.TIMEZONE = secret.TIMEZONE;
  }

  if (secret.APP_NAME) {
    process.env.APP_NAME = secret.APP_NAME;
  }

  if (secret.APP_API_KEY) {
    process.env.APP_API_KEY = secret.APP_API_KEY;
  }

  if (secret.PORT) {
    process.env.PORT = secret.PORT;
  }

  if (secret.DATABASE_HOST) {
    process.env.DATABASE_HOST = secret.DATABASE_HOST;
  }

  if (secret.DATABASE_NAME) {
    process.env.DATABASE_NAME = secret.DATABASE_NAME;
  }

  if (secret.DATABASE_PORT) {
    process.env.DATABASE_PORT = secret.DATABASE_PORT;
  }

  if (secret.DATABASE_USER) {
    process.env.DATABASE_USER = secret.DATABASE_USER;
  }

  if (secret.DATABASE_PASSWORD) {
    process.env.DATABASE_PASSWORD = secret.DATABASE_PASSWORD;
  }

  if (secret.DATABASE_ACQUIRE) {
    process.env.DATABASE_ACQUIRE = secret.DATABASE_ACQUIRE;
  }

  if (secret.DATABASE_IDLE) {
    process.env.DATABASE_IDLE = secret.DATABASE_IDLE;
  }

  if (secret.DATABASE_POOL_MAX) {
    process.env.DATABASE_POOL_MAX = secret.DATABASE_POOL_MAX;
  }

  if (secret.DATABASE_POOL_MIN) {
    process.env.DATABASE_POOL_MIN = secret.DATABASE_POOL_MIN;
  }

  if (secret.KEYCLOAK_BASE_URL) {
    process.env.KEYCLOAK_BASE_URL = secret.KEYCLOAK_BASE_URL;
  }

  if (secret.KEYCLOAK_PUBLIC_KEY) {
    process.env.KEYCLOAK_PUBLIC_KEY = secret.KEYCLOAK_PUBLIC_KEY;
  }

  if (secret.KEYCLOAK_GRANT_TYPE) {
    process.env.KEYCLOAK_GRANT_TYPE = secret.KEYCLOAK_GRANT_TYPE;
  }

  if (secret.KEYCLOAK_CLIENT_ID) {
    process.env.KEYCLOAK_CLIENT_ID = secret.KEYCLOAK_CLIENT_ID;
  }

  if (secret.KEYCLOAK_CLIENT_SECRET) {
    process.env.KEYCLOAK_CLIENT_SECRET = secret.KEYCLOAK_CLIENT_SECRET;
  }

  if (secret.KEYCLOAK_REALM_NAME) {
    process.env.KEYCLOAK_REALM_NAME = secret.KEYCLOAK_REALM_NAME;
  }

  if (secret.KEYCLOAK_REALM_URL) {
    process.env.KEYCLOAK_REALM_URL = secret.KEYCLOAK_REALM_URL;
  }

  if (secret.RATE_LIMIT_ENABLED) {
    process.env.RATE_LIMIT_ENABLED = secret.RATE_LIMIT_ENABLED;
  }

  if (secret.RATE_LIMIT_GENERAL_WINDOW_MS) {
    process.env.RATE_LIMIT_GENERAL_WINDOW_MS = secret.RATE_LIMIT_GENERAL_WINDOW_MS;
  }

  if (secret.RATE_LIMIT_CRITICAL_MAX) {
    process.env.RATE_LIMIT_CRITICAL_MAX = secret.RATE_LIMIT_CRITICAL_MAX;
  }

  if (secret.RATE_LIMIT_CRITICAL_ENDPOINTS) {
    process.env.RATE_LIMIT_CRITICAL_ENDPOINTS = secret.RATE_LIMIT_CRITICAL_ENDPOINTS;
  }

  if (secret.MULTER_FILE_SIZE) {
    process.env.MULTER_FILE_SIZE = secret.MULTER_FILE_SIZE;
  }

  if (secret.AWS_ACCESS_KEY) {
    process.env.AWS_ACCESS_KEY = secret.AWS_ACCESS_KEY;
  }

  if (secret.AWS_SECRET_KEY) {
    process.env.AWS_SECRET_KEY = secret.AWS_SECRET_KEY;
  }

  if (secret.AWS_S3_BUCKET_REGION) {
    process.env.AWS_S3_BUCKET_REGION = secret.AWS_S3_BUCKET_REGION;
  }

  if (secret.AWS_S3_BUCKET_NAME) {
    process.env.AWS_S3_BUCKET_NAME = secret.AWS_S3_BUCKET_NAME;
  }

  if (secret.AWS_S3_BUCKET_EXPIRES) {
    process.env.AWS_S3_BUCKET_EXPIRES = secret.AWS_S3_BUCKET_EXPIRES;
  }

  if (secret.AWS_SECRET_MANAGER_REGION) {
    process.env.AWS_SECRET_MANAGER_REGION = secret.AWS_SECRET_MANAGER_REGION;
  }

  if (secret.SLACK_WEBHOOK_ENABLED) {
    process.env.SLACK_WEBHOOK_ENABLED = secret.SLACK_WEBHOOK_ENABLED;
  }

  if (secret.SLACK_WEBHOOK_URL) {
    process.env.SLACK_WEBHOOK_URL = secret.SLACK_WEBHOOK_URL;
  }

  if (secret.MAILING_PROVIDER) {
    process.env.MAILING_PROVIDER = secret.MAILING_PROVIDER;
  }

  if (secret.MANDRILL_BASE_URL) {
    process.env.MANDRILL_BASE_URL = secret.MANDRILL_BASE_URL;
  }

  if (secret.SENDGRID_API_KEY) {
    process.env.SENDGRID_API_KEY = secret.SENDGRID_API_KEY;
  }

  if (secret.SMTP_HOST) {
    process.env.SMTP_HOST = secret.SMTP_HOST;
  }

  if (secret.SMTP_PORT) {
    process.env.SMTP_PORT = secret.SMTP_PORT;
  }

  if (secret.SMTP_SECURE) {
    process.env.SMTP_SECURE = secret.SMTP_SECURE;
  }

  if (secret.SMTP_AUTH_USER) {
    process.env.SMTP_AUTH_USER = secret.SMTP_AUTH_USER;
  }

  if (secret.SMTP_AUTH_PASSWORD) {
    process.env.SMTP_AUTH_PASS = secret.SMTP_AUTH_PASSWORD;
  }

  if (secret.SMTP_FROM_NAME) {
    process.env.SMTP_FROM_NAME = secret.SMTP_FROM_NAME;
  }

  if (secret.SMTP_FROM_ADDRESS) {
    process.env.SMTP_FROM_ADDRESS = secret.SMTP_FROM_ADDRESS;
  }

  setConstants();
};

const parse = (): ConstantsSchemaType => {
  let constants: ConstantsSchemaType = null;

  try {
    constants = ConstantsSchema.parse(process.env);
  } catch (error) {
    logError('Error when initializing the application in constants parse');
    throw new Error(error.message);
  }

  return constants;
};

const Constants: IConstants = {} as IConstants;

const setConstants = () => {
  const config = parse();

  Constants.env = config.NODE_ENV as Environments;
  Constants.debug = config.DEBUG === 'true';
  Constants.timezone = config.TIMEZONE;
  Constants.appName = config.APP_NAME;
  Constants.appKey = config.APP_API_KEY;
  Constants.port = Number(config.PORT);

  Constants.database = {
    hostWrite: config.DATABASE_HOST,
    name: config.DATABASE_NAME,
    port: Number(config.DATABASE_PORT),
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    pool: {
      acquire: Number(config.DATABASE_ACQUIRE),
      idle: Number(config.DATABASE_IDLE),
      max: Number(config.DATABASE_POOL_MAX),
      min: Number(config.DATABASE_POOL_MIN),
    },
  };

  Constants.keycloak = {
    baseURL: config.KEYCLOAK_BASE_URL,
    publicKey: config.KEYCLOAK_PUBLIC_KEY,
    grantType: config.KEYCLOAK_GRANT_TYPE,
    client: {
      id: config.KEYCLOAK_CLIENT_ID,
      secret: config.KEYCLOAK_CLIENT_SECRET,
    },
    realm: {
      name: config.KEYCLOAK_REALM_NAME,
      url: config.KEYCLOAK_REALM_URL,
    },
  };

  Constants.rateLimit = {
    enabled: config.RATE_LIMIT_ENABLED === 'true',
    general: {
      windowMs: Number(config.RATE_LIMIT_GENERAL_WINDOW_MS),
      max: Number(config.RATE_LIMIT_GENERAL_MAX),
    },
    critical: {
      windowMs: Number(config.RATE_LIMIT_CRITICAL_WINDOW_MS),
      max: Number(config.RATE_LIMIT_CRITICAL_MAX),
      endpoints: config.RATE_LIMIT_CRITICAL_ENDPOINTS.split(','),
    },
  };

  Constants.multer = {
    fileSize: Number(config.MULTER_FILE_SIZE),
  };

  Constants.aws = {
    accessKey: config.AWS_ACCESS_KEY,
    secretKey: config.AWS_SECRET_KEY,
    bucket: {
      region: config.AWS_S3_BUCKET_REGION,
      name: config.AWS_S3_BUCKET_NAME,
      expires: Number(config.AWS_S3_BUCKET_EXPIRES),
    },
    cloudwatch: {
      region: config.AWS_CLOUDWATCH_REGION,
    },
    secretManager: {
      region: config.AWS_SECRET_MANAGER_REGION,
    },
  };

  Constants.slack = {
    enabled: config.SLACK_WEBHOOK_ENABLED === 'true',
    webhookUrl: config.SLACK_WEBHOOK_URL,
  };

  Constants.mailing = {
    provider: config.MAILING_PROVIDER,

    mandrill: {
      url: config.MANDRILL_BASE_URL,

      from: {
        address: config.MANDRILL_FROM_EMAIL,
        name: config.MANDRILL_FROM_NAME,
      },
    },

    sendgrid: {
      apiKey: config.SENDGRID_API_KEY,

      from: {
        address: config.SENDGRID_FROM_EMAIL,
      },
    },

    smtp: {
      host: config.SMTP_HOST,
      port: Number(config.SMTP_PORT ?? '0'),
      secure: config.SMTP_SECURE === 'true',

      auth: {
        user: config.SMTP_AUTH_USER,
        password: config.SMTP_AUTH_PASSWORD,
      },

      from: {
        name: config.SMTP_FROM_NAME,
        address: config.SMTP_FROM_ADDRESS,
      },
    },
  };

  Constants.lambda = {
    url: config.LAMBDA_BASE_URL as string,
  };
};

const setLuxon = () => {
  Settings.defaultLocale = 'pt-BR';
  Settings.defaultZone = Constants.timezone;
};

export const getEnv = (): IConstants => {
  if (!Object.keys(Constants).length) {
    setConstants();
  }

  return Constants;
};

export const initializeConstants = () => {
  setConstants();
  setLuxon();
  logInit('Environment initialized');
};