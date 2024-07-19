import { injectable } from 'inversify';
import { DeleteResult, FindConditions, FindManyOptions, getRepository, Repository, UpdateResult } from 'typeorm';

import { AuthCredentialsEntity } from '@core/db/entities';
import { IAuthCredentialsRepository } from '@core/db/repositories/auth-credentials/auth-credentials.interface';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class AuthCredentialsRepository implements IAuthCredentialsRepository {
  private authCredentialsRepository: Repository<AuthCredentialsEntity> = getRepository(AuthCredentialsEntity);

  async create (authCredentials: AuthCredentialsEntity): Promise<AuthCredentialsEntity> {
    let response: AuthCredentialsEntity | null = null;

    try {
      response = await this.authCredentialsRepository.save(authCredentials);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<AuthCredentialsEntity | null> {
    let response: AuthCredentialsEntity | null = null;

    try {
      response = await this.authCredentialsRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, authCredentials: AuthCredentialsEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.authCredentialsRepository.update(id, authCredentials);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByWhere (where: FindConditions<AuthCredentialsEntity>): Promise<AuthCredentialsEntity | null> {
    let response: AuthCredentialsEntity | null = null;

    try {
      response = await this.authCredentialsRepository.findOne({ where });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.authCredentialsRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async deleteByWhere (where: FindConditions<AuthCredentialsEntity>): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.authCredentialsRepository.softDelete(where);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<AuthCredentialsEntity>): Promise<(AuthCredentialsEntity | null)[]> {
    let response: AuthCredentialsEntity[] | null = null;

    try {
      response = await this.authCredentialsRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

}
