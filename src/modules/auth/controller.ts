import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  IHttpActionResult,
  interfaces,
} from 'inversify-express-utils';

import { UserEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import { IAccessToken } from '@core/models/session';
import Types from '@core/types';

import { AuthenticateDTO, RecoveryPasswordDTO, RefreshTokenDTO, ResetPasswordDTO } from '@modules/auth/dtos';
import {
  IAuthenticateUseCase,
  IGetMeUseCase,
  IRecoveryPasswordUseCase,
  IRefreshTokenUseCase,
  IResetPasswordUseCase,
} from '@modules/auth/use-cases';

import { authenticate } from '@shared/middlewares';

@controller('/auth')
export class AuthController extends BaseHttpController implements interfaces.Controller {
  private readonly authenticateUseCase: IAuthenticateUseCase;
  private readonly getMeUseCase: IGetMeUseCase;
  private readonly refreshTokenUseCase: IRefreshTokenUseCase;
  private readonly recoveryPasswordUseCase: IRecoveryPasswordUseCase;
  private readonly resetPasswordUseCase: IResetPasswordUseCase;

  constructor (
    @inject(Types.AuthenticateUseCase)
      authenticateUseCase: IAuthenticateUseCase,
    @inject(Types.RefreshTokenUseCase)
      refreshTokenUseCase: IRefreshTokenUseCase,
    @inject(Types.GetMeUseCase)
      getMeUseCase: IGetMeUseCase,
    @inject(Types.RecoveryPasswordUseCase)
      recoveryPasswordUseCase: IRecoveryPasswordUseCase,
    @inject(Types.ResetPasswordUseCase)
      resetPasswordUseCase: IResetPasswordUseCase
  ) {
    super();
    this.authenticateUseCase = authenticateUseCase;
    this.getMeUseCase = getMeUseCase;
    this.refreshTokenUseCase = refreshTokenUseCase;
    this.recoveryPasswordUseCase = recoveryPasswordUseCase;
    this.resetPasswordUseCase = resetPasswordUseCase;
  }

  @httpPost('/')
  public async authenticate (req: ICustomRequest): Promise<IAccessToken> {
    return this.authenticateUseCase.execute(req.body as AuthenticateDTO);
  }

  @httpGet('/me', authenticate)
  public async getMe (req: ICustomRequest): Promise<UserEntity> {
    return this.getMeUseCase.execute(req.session.id);
  }

  @httpPost('/recovery-password')
  public async recoveryPassword (req: ICustomRequest): Promise<IHttpActionResult> {
    await this.recoveryPasswordUseCase.execute(req.body as RecoveryPasswordDTO);
    return this.ok();
  }

  @httpPost('/refresh-token')
  public async refreshToken (req: ICustomRequest): Promise<IAccessToken> {
    return this.refreshTokenUseCase.execute(req.body as RefreshTokenDTO);
  }

  @httpPost('/reset-password')
  public async resetPassword (req: ICustomRequest): Promise<IHttpActionResult> {
    await this.resetPasswordUseCase.execute(req.body as ResetPasswordDTO);
    return this.ok();
  }
}
