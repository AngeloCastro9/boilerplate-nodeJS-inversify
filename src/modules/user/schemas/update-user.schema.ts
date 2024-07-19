import { ParamSchema, Schema } from 'express-validator';

const emailRules: ParamSchema = {
  in: 'body',
  isString: { bail: true },
  isEmail: { bail: true },
  optional: {
    options: {
      nullable: true,
    },
  },
  errorMessage: 'invalid_email_format',
};

const nameRules: ParamSchema = {
  in: 'body',
  isString: { bail: true },
  isLength: {
    options: { min: 1, max: 60 },
    bail: true,
  },
  optional: {
    options: {
      nullable: true,
    },
  },
  errorMessage: 'invalid_name_format',
};

const passwordRules: ParamSchema = {
  in: 'body',
  isString: { bail: true },
  isLength: {
    options: { min: 8, max: 50 },
    bail: true,
  },
  isStrongPassword: {
    options: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    },
  },
  optional: {
    options: {
      nullable: true,
    },
  },
  errorMessage: 'invalid_password_format',
};

export const UpdateUserSchema: Schema = {
  name: { ...nameRules },
  email: { ...emailRules },
  password: { ...passwordRules },
};