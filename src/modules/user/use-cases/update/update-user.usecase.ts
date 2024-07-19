import { inject, injectable } from 'inversify';
import { Not } from 'typeorm';

import { IAuthContract } from '@core/contracts';
import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { UpdateUserDTO } from '@modules/user/dtos/update-user.dto';
import { IUpdateUserUseCase } from '@modules/user/use-cases/update/update-user.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(Types.AuthContract)
    private readonly authContract: IAuthContract
  ) {}

  async execute (id: string, dto: UpdateUserDTO, actor: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.selectById(id);

    if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    const hasEmailChanged = dto.email && user.email !== dto.email;

    if (hasEmailChanged) {
      const hasSameEmail = await this.userRepository.selectByWhere({
        email: dto.email,
        id: Not(id),
      });

      if (hasSameEmail) throw new BusinessError(BusinessErrorCodes.USER_ALREADY_REGISTERED);
    }

    await this.authContract.updateUser({
      id,
      name: dto.name,
      email: dto.email,
      hasEmailChanged,
      password: dto.password,
    });

    await this.userRepository.updateById(id, {
      ...dto.companyId && { companyId: dto.companyId },
      ...dto.name && { name: dto.name },
      ...dto.email && { email: dto.email },
      ...dto.profileType && { profileType: dto.profileType },
      updatedBy: (actor && actor.id) || 'SYSTEM',
    });

    const userUpdated = await this.userRepository.selectById(id);

    return serializeEntity<UserEntity>(UserEntity, userUpdated);
  }
}
