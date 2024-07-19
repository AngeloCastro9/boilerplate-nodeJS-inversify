import { IAccessToken } from '@core/models/session';

import { AuthenticateDTO } from '@modules/auth/dtos';

export interface IAuthenticateUseCase {
  execute(dto: AuthenticateDTO): Promise<IAccessToken>;
}
