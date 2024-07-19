export interface IAuthenticateDTO {
  email: string;
  password: string;
}

export interface IAuthenticateResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRefreshAccessDTO {
  refreshToken: string;
}

export interface IAuthRefreshAccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthCreateUserDTO {
  name: string;
  email: string;
  password: string;
  groups?: [];
}

export interface IAuthUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  hasEmailChanged?: boolean;
  password?: string;
}

export interface IAuthGetUserByEmailDTO {
  email: string;
}

export interface IAuthDeleteUserDTO {
  id: string;
}

export interface IAuthGetUserByEmailResponse {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
}

export interface IAuthResetPasswordDTO {
  id: string;
  password: string;
}

export interface IAuthVerifyTokenDTO {
  token: string;
}

export interface IAuthVerifyTokenResponse {
  id: string;
  sub: string;
  firstName: string;
  lastName: string;
  active: boolean;
  email: string;
}