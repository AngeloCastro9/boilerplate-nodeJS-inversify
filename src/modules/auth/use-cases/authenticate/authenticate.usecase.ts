import { inject, injectable } from 'inversify';

import { IAuthContract } from '@core/contracts';
import { IUserRepository } from '@core/db/repositories';
import { IAccessToken } from '@core/models/session';
import Types from '@core/types';

import { AuthenticateDTO } from '@modules/auth/dtos';
import { IAuthenticateUseCase } from '@modules/auth/use-cases/authenticate/authenticate.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';
import { LuxonHelper } from '@shared/helpers';

@injectable()
export class AuthenticateUseCase implements IAuthenticateUseCase {
  constructor (
    @inject(Types.AuthContract)
    private readonly authContract: IAuthContract,

    @inject(Types.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute (dto: AuthenticateDTO): Promise<IAccessToken> {
    const { email, password } = dto;

    const exists = await this.userRepository.selectByWhere({ email });

    if (!exists) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    const response = await this.authContract.authenticate({ email, password });

    await this.userRepository.updateById(exists.id, {
      lastAccessAt: LuxonHelper.getCurrentDate(),
    });

    return response;
  }
}
