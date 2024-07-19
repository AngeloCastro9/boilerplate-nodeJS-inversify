import { faker } from '@faker-js/faker';
import { DeleteResult, FindConditions, FindManyOptions, UpdateResult } from 'typeorm';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories/user';
import { ICount, ISearchParameterUser, Pagination } from '@core/models/pagination';

import { getUserMatchCondition, getUserMatchSearch } from '@tests/repositories/user/user-in-memory.filter';

export class UserRepositoryInMemory implements IUserRepository {
  public users: UserEntity[] = [];

  async create (user: UserEntity): Promise<UserEntity> {
    user.id = faker.string.uuid();
    this.users.push(user);

    return user;
  }

  async updateById (id: string, user: UserEntity): Promise<UpdateResult> {
    const findUser = this.users.find(user => user.id === id);
    Object.assign(findUser, user);
    return new UpdateResult;
  }

  async updateByWhere (where: FindConditions<UserEntity>, user: UserEntity): Promise<UpdateResult> {
    const findCompany = this.users.find((user) => user.id === where.id);
    Object.assign(findCompany, user);
    return new UpdateResult();
  }

  async selectById (id: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async selectByWhere (where: FindConditions<UserEntity>): Promise<UserEntity> {
    const user = this.users.find(user => getUserMatchCondition(user, where));
    return user;
  }

  async selectPagination (searchParameter: ISearchParameterUser): Promise<Pagination<UserEntity>> {
    const rows = this.users
      .filter((user) => getUserMatchSearch(user, searchParameter));

    return {
      rows: rows.slice(searchParameter.offset, searchParameter.limit),
      count: rows.length,
    };
  }

  async selectByOptions (options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    const rows = this.users.filter(
      (user) =>
        options.where && getUserMatchCondition(user, options.where as FindConditions<UserEntity>)
    );

    return rows;
  }

  async selectOneByOptions (options?: FindManyOptions<UserEntity>): Promise<UserEntity> {
    const rows = this.users.filter(
      (user) =>
        options.where && getUserMatchCondition(user, options.where as FindConditions<UserEntity>)
    );

    return rows[0];
  }

  async deleteById (id: string): Promise<DeleteResult> {
    const user = this.users.find((user) => user.id === id);
    this.users.splice(this.users.indexOf(user));
    return new DeleteResult;
  }

  async deleteByWhere (where: FindConditions<UserEntity>): Promise<DeleteResult> {
    const user = this.users.find((user) => getUserMatchCondition(user, where));
    this.users.splice(this.users.indexOf(user));
    return new DeleteResult;
  }

  async selectCount (searchParameter: ISearchParameterUser): Promise<ICount> {
    const count = this.users
      .filter((user) => getUserMatchSearch(user, searchParameter))
      .length;

    return { count };
  }
}