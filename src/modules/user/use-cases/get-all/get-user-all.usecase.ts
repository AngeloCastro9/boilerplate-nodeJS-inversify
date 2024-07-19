import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { getUserFilter, IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import { ISearchParameterUser } from '@core/models/pagination';
import Types from '@core/types';

import { IGetUserAllUseCase } from '@modules/user/use-cases/get-all/get-user-all.interface';

@injectable()
export class GetUserAllUseCase implements IGetUserAllUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (searchParameter: ISearchParameterUser): Promise<UserEntity[]> {
    const { where } = getUserFilter(searchParameter);

    const users = await this.userRepository.selectByOptions({ where });

    return users.map(user => serializeEntity<UserEntity>(UserEntity, user));
  }
}
