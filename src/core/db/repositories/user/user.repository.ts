import { injectable } from 'inversify';
import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { UserEntity } from '@core/db/entities';
import { getUserFilter } from '@core/db/repositories/user/user.filter';
import { IUserRepository } from '@core/db/repositories/user/user.interface';
import { ICount, ISearchParameterUser, Pagination } from '@core/models/pagination';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class UserRepository implements IUserRepository {
  private userRepository: Repository<UserEntity> = getRepository(UserEntity);

  async selectPagination (searchParameter: ISearchParameterUser): Promise<Pagination<UserEntity>> {
    let response: Pagination<UserEntity> | null = null;

    const { where } = getUserFilter(searchParameter);

    try {
      const [ rows, count ] = await this.userRepository.findAndCount({
        where,
        skip: searchParameter.offset,
        take: searchParameter.limit,
        order: {
          [searchParameter.orderBy]: searchParameter.isDESC ? 'DESC' : 'ASC',
        },
      });

      response = {
        rows,
        count,
      };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.PAGINATION_ENTITY, err);
    }

    return response;
  }

  async create (user: UserEntity): Promise<UserEntity> {
    let response: UserEntity | null = null;

    try {
      response = await this.userRepository.save(user);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<UserEntity | null> {
    let response: UserEntity | null = null;

    try {
      response = await this.userRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, user: UserEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.userRepository.update(id, user);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async updateByWhere (where: FindConditions<UserEntity>, user:UserEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.userRepository.update(where, user);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByWhere (where: FindConditions<UserEntity>): Promise<UserEntity | null> {
    let response: UserEntity | null = null;

    try {
      response = await this.userRepository.findOne({ where });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<UserEntity>): Promise<(UserEntity | null)[]> {
    let response: UserEntity[] | null = null;

    try {
      response = await this.userRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectOneByOptions (options?: FindManyOptions<UserEntity>): Promise<UserEntity | null> {
    let response: UserEntity | null = null;

    try {
      const [ user ] = await this.userRepository.find({ ...options, take: 1 });
      response = user;

    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.userRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async deleteByWhere (where: FindConditions<UserEntity>): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.userRepository.softDelete(where);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async selectCount (searchParameter: ISearchParameterUser): Promise<ICount> {
    let response: ICount | null = null;

    const { where } = getUserFilter(searchParameter);

    try {
      const count = await this.userRepository.count({ where });
      response = { count };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.COUNT_ENTITY, err);
    }

    return response;
  }
}
