import { inject, injectable } from 'inversify';
import { MoreThan } from 'typeorm';

import { IAuthContract } from '@core/contracts';
import { IAuthCredentialsRepository, IUserRepository } from '@core/db/repositories';
import Types from '@core/types';

import { ResetPasswordDTO } from '@modules/auth/dtos';
import { IResetPasswordUseCase } from '@modules/auth/use-cases/reset-password/reset-password.interface';

import { AuthCredentialsType } from '@shared/enumerators';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';
import { LuxonHelper } from '@shared/helpers';

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor (
    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(Types.AuthContract)
    private readonly authContract: IAuthContract,

    @inject(Types.AuthCredentialsRepository)
    private readonly authCredentialsRepository: IAuthCredentialsRepository
  ) {}

  async execute (dto: ResetPasswordDTO): Promise<void> {
    const { email, recoveryToken, password } = dto;

    const userExists = await this.userRepository.selectByWhere({ email });

    if (!userExists) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    const authCredentialsExists = await this.authCredentialsRepository.selectByWhere({
      userId: userExists.id,
      token: recoveryToken,
      type: AuthCredentialsType.RECOVERY_PASSWORD_TOKEN,
      tokenExpiry: MoreThan(LuxonHelper.getCurrent()),
    });

    if (!authCredentialsExists) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    await this.authContract.resetPassword({
      id: userExists.id,
      password,
    });

    await this.authCredentialsRepository.deleteById(authCredentialsExists.id);
  }

}
