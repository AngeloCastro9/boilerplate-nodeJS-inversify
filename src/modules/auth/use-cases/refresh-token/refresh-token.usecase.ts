import { inject, injectable } from 'inversify';

import { IAuthContract } from '@core/contracts';
import { IAccessToken } from '@core/models/session';
import Types from '@core/types';

import { RefreshTokenDTO } from '@modules/auth/dtos';
import { IRefreshTokenUseCase } from '@modules/auth/use-cases/refresh-token/refresh-token.interface';

@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor (
    @inject(Types.AuthContract)
    private readonly authContract: IAuthContract
  ) {}

  async execute (dto: RefreshTokenDTO): Promise<IAccessToken> {
    const { refreshToken } = dto;

    const response = await this.authContract.refreshAccess({ refreshToken });

    return response;
  }
}
