import { inject, injectable } from 'inversify';

import { IAuthContract } from '@core/contracts';
import { UserEntity } from '@core/db/entities';
import { IUserRepository } from '@core/db/repositories';
import Types from '@core/types';

import { IDeleteUserUseCase } from '@modules/user/use-cases/delete/delete-user.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(Types.AuthContract)
    private readonly authContract: IAuthContract
  ) {}

  async execute (id: string, actor: UserEntity): Promise<void> {
    const user = await this.userRepository.selectById(id);

    if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    await this.userRepository.updateById(id, {
      deletedBy: (actor && actor.id) || 'SYSTEM',
    });

    await this.authContract.deleteUser({ id });
    await this.userRepository.deleteById(id);
  }
}
