import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import { ISearchParameterUser, Pagination } from '@core/models/pagination';
import Types from '@core/types';

import { IGetUserWithPaginationUseCase } from '@modules/user/use-cases/get-with-pagination/get-user-with-pagination.interface';

@injectable()
export class GetUserWithPaginationUseCase implements IGetUserWithPaginationUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (searchParameter: ISearchParameterUser): Promise<Pagination<UserEntity>> {
    const { rows, count } = await this.userRepository.selectPagination(searchParameter);

    return {
      rows: rows.map(row => serializeEntity<UserEntity>(UserEntity, row)),
      count,
    };
  }
}
