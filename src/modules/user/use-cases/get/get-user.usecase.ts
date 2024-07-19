import { inject, injectable } from 'inversify';

import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { IGetUserUseCase } from '@modules/user/use-cases/get/get-user.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class GetUserUseCase implements IGetUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (id: string): Promise<UserEntity> {
    const user = await this.userRepository.selectById(id);

    if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    return serializeEntity<UserEntity>(UserEntity, user);
  }
}
