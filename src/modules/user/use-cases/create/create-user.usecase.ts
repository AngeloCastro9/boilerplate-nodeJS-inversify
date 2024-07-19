import { inject, injectable } from 'inversify';

import { IAuthContract } from '@core/contracts';
import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { CreateUserDTO } from '@modules/user/dtos/create-user.dto';
import { ICreateUserUseCase } from '@modules/user/use-cases/create/create-user.interface';

import { ProfileType } from '@shared/enumerators';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(Types.AuthContract)
    private readonly authContract: IAuthContract
  ) {}

  async execute (dto: CreateUserDTO, actor: UserEntity): Promise<UserEntity> {
    const exists = await this.userRepository.selectOneByOptions({
      where: [ { email: dto.email } ],
    });

    if (exists) throw new BusinessError(BusinessErrorCodes.USER_ALREADY_REGISTERED);

    await this.authContract.createUser({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    const { id } = await this.authContract.getUserByEmail({ email: dto.email });

    const userCreated = await this.userRepository.create({
      id,
      companyId: dto.companyId,
      name: dto.name,
      email: dto.email,
      profileType: dto.profileType ?? ProfileType.ADMINISTRATOR,
      createdBy: (actor && actor.id) || 'SYSTEM',
      updatedBy: (actor && actor.id) || 'SYSTEM',
    });

    return serializeEntity<UserEntity>(UserEntity, userCreated);
  }
}