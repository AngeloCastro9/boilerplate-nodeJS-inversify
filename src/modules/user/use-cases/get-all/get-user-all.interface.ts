import { UserEntity } from '@core/db/entities';
import { ISearchParameterUser } from '@core/models/pagination';

export interface IGetUserAllUseCase {
  execute(searchParameter: ISearchParameterUser): Promise<UserEntity[]>;
}
