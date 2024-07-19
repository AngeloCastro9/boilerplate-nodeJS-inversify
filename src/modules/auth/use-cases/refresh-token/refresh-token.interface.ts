import { IAccessToken } from '@core/models/session';

import { RefreshTokenDTO } from '@modules/auth/dtos';

export interface IRefreshTokenUseCase {
  execute(dto: RefreshTokenDTO): Promise<IAccessToken>;
}
