import * as z from 'zod';

import { MailProvider } from '@shared/enumerators';

const Schema = z.object({
  NODE_ENV: z.string(),
  APP_NAME: z.string().optional(),
  APP_API_KEY: z.string(),
  DEBUG: z.string().default('false'),
  TIMEZONE: z.string().default('America/Sao_Paulo'),
  locale: z.string().default('pt-br'),
  PORT: z.string().default('3025'),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().default('5432'),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_POOL_MAX: z.string().default('10'),
  DATABASE_POOL_MIN: z.string().default('1'),
  DATABASE_ACQUIRE: z.string().default('10000'),
  DATABASE_IDLE: z.string().default('20000'),

  RATE_LIMIT_ENABLED: z.string().default('false'),
  RATE_LIMIT_GENERAL_WINDOW_MS: z.string().default('15000'),
  RATE_LIMIT_GENERAL_MAX: z.string().default('5'),
  RATE_LIMIT_CRITICAL_WINDOW_MS: z.string().default('30000'),
  RATE_LIMIT_CRITICAL_MAX: z.string().default('3'),
  RATE_LIMIT_CRITICAL_ENDPOINTS: z.string().default(''),

  MULTER_FILE_SIZE: z.string().default('31457280'),

  AWS_ACCESS_KEY: z.string().optional(),
  AWS_SECRET_KEY: z.string().optional(),
  AWS_CLOUDWATCH_REGION: z.string().optional(),
  AWS_S3_BUCKET_REGION: z.string().optional(),
  AWS_S3_BUCKET_NAME: z.string().optional(),
  AWS_S3_BUCKET_EXPIRES: z.string().default('300'),
  AWS_SECRET_MANAGER_CONSTANTS: z.string().optional(),
  AWS_SECRET_MANAGER_REGION: z.string().optional(),

  KEYCLOAK_BASE_URL: z.string(),
  KEYCLOAK_PUBLIC_KEY: z.string(),
  KEYCLOAK_GRANT_TYPE: z.string(),
  KEYCLOAK_CLIENT_ID: z.string(),
  KEYCLOAK_CLIENT_SECRET: z.string(),
  KEYCLOAK_REALM_URL: z.string(),
  KEYCLOAK_REALM_NAME: z.string(),

  SLACK_WEBHOOK_URL: z.string().optional(),
  SLACK_WEBHOOK_ENABLED: z.string().default('false'),

  MAILING_PROVIDER: z.string().default(MailProvider.SMTP),
  MANDRILL_BASE_URL: z.string().optional(),
  MANDRILL_FROM_EMAIL: z.string().optional(),
  MANDRILL_FROM_NAME: z.string().optional(),

  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM_EMAIL: z.string().optional(),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  SMTP_AUTH_USER: z.string().optional(),
  SMTP_AUTH_PASSWORD: z.string().optional(),
  SMTP_FROM_NAME: z.string().optional(),
  SMTP_FROM_ADDRESS: z.string().optional(),
});

export default Schema;