import { UserEntity } from '@core/db/entities';
import { ISearchParameterUser, Pagination } from '@core/models/pagination';

export interface IGetUserWithPaginationUseCase {
  execute(searchParameter: ISearchParameterUser): Promise<Pagination<UserEntity>>;
}
