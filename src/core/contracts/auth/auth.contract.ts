import { injectable } from 'inversify';

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
import { IAuthContract } from '@core/contracts/auth/auth.interfaces';

import KeycloakService from '@shared/mechanisms/keycloak/service';
import { getFirstWordFromText, getLastWordFromText } from '@shared/utils';

@injectable()
export class AuthContract implements IAuthContract {
  async authenticate (params: IAuthenticateDTO): Promise<IAuthenticateResponse> {
    const response = await KeycloakService.auth(params.email, params.password);

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }

  async verifyAccess (params: IAuthVerifyTokenDTO): Promise<IAuthVerifyTokenResponse> {
    const { id, firstName, lastName, email, active, sub } = await KeycloakService.verifyToken(params.token);

    return {
      id,
      sub,
      firstName,
      lastName,
      email,
      active,
    };
  }

  async refreshAccess (params: IAuthRefreshAccessDTO): Promise<IAuthRefreshAccessResponse> {
    const response = await KeycloakService.refreshAuth(params.refreshToken);

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
  }

  async createUser (params: IAuthCreateUserDTO): Promise<void> {
    await KeycloakService.createUser({
      firstName: getFirstWordFromText(params.name),
      lastName: getLastWordFromText(params.name),
      email: params.email,
      groups: params.groups ?? [],
      password: params.password,
      username: params.email,
    });
  }

  async updateUser (params: IAuthUpdateUserDTO): Promise<void> {
    await KeycloakService.updateUser(params.id, {
      ...params.name && {
        firstName: getFirstWordFromText(params.name),
        lastName: getLastWordFromText(params.name),
      },
      ...params.hasEmailChanged && {
        email: params.email,
        username: params.email,
      },
      ...params.password && {
        password: params.password,
      },
    });
  }

  async deleteUser (params: IAuthDeleteUserDTO): Promise<void> {
    await KeycloakService.deleteUserById(params.id);
  }

  async getUserByEmail (params: IAuthGetUserByEmailDTO): Promise<IAuthGetUserByEmailResponse> {
    const { id, firstName, lastName, email, active } = await KeycloakService.selectUserByEmail(params.email);

    return {
      id,
      firstName,
      lastName,
      email,
      active,
    };
  }

  async resetPassword (params: IAuthResetPasswordDTO): Promise<void> {
    await KeycloakService.resetPassword(params.id, params.password);
  }

}