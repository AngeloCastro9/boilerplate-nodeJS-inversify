import { checkSchema, Schema } from 'express-validator';
import { Middleware } from 'express-validator/src/base';

/**
 * Middleware to check schema.
 *
 * @export
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Next} next
 * @returns void
 */
export function schemaCheck (schema: Schema): Middleware {
  return checkSchema(schema) as unknown as Middleware;
}