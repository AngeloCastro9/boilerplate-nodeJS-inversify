import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import Types from '@core/types';

import { IGetMeUseCase } from '@modules/auth/use-cases/get-me/get-me.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class GetMeUseCase implements IGetMeUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (id: string): Promise<UserEntity> {
    const actor = await this.userRepository.selectById(id);

    if (!actor) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    return actor;
  }
}
