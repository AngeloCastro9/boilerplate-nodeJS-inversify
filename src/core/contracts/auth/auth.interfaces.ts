import {
  IAuthCreateUserDTO,
  IAuthDeleteUserDTO,
  IAuthenticateDTO,
  IAuthenticateResponse,
  IAuthGetUserByEmailDTO,
  IAuthGetUserByEmailResponse,
  IAuthRefreshAccessDTO,
  IAuthRefreshAccessResponse,
  IAuthResetPasswordDTO,
  IAuthUpdateUserDTO,
  IAuthVerifyTokenDTO,
  IAuthVerifyTokenResponse,
} from '@core/contracts/auth/auth.dto';

export interface IAuthContract {
  authenticate(params: IAuthenticateDTO): Promise<IAuthenticateResponse>;
  refreshAccess(params: IAuthRefreshAccessDTO): Promise<IAuthRefreshAccessResponse>;
  verifyAccess(params: IAuthVerifyTokenDTO): Promise<IAuthVerifyTokenResponse>;
  resetPassword(params: IAuthResetPasswordDTO): Promise<void>;
  createUser(params: IAuthCreateUserDTO): Promise<void>;
  updateUser(params: IAuthUpdateUserDTO): Promise<void>;
  deleteUser(params: IAuthDeleteUserDTO): Promise<void>;
  getUserByEmail(params: IAuthGetUserByEmailDTO): Promise<IAuthGetUserByEmailResponse>;
}