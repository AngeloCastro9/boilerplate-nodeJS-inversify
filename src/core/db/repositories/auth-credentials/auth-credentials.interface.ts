import { DeleteResult, FindConditions, FindManyOptions, UpdateResult } from 'typeorm';

import { AuthCredentialsEntity } from '@core/db/entities';

export interface IAuthCredentialsRepository {
  create(authCredentials: AuthCredentialsEntity): Promise<AuthCredentialsEntity>;
  updateById(id: string, authCredentials: AuthCredentialsEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<AuthCredentialsEntity | null>;
  selectByWhere(where: FindConditions<AuthCredentialsEntity>): Promise<AuthCredentialsEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
  deleteByWhere(where: FindConditions<AuthCredentialsEntity>): Promise<DeleteResult>;
  selectByOptions(options?: FindManyOptions<AuthCredentialsEntity>): Promise<(AuthCredentialsEntity | null)[]>;
}