import { Container } from 'inversify';

import {
  AuthContract,
  IAuthContract,
  IMailContract,
  MailContract,
} from '@core/contracts';
import {
  AuthCredentialsRepository,
  IAuthCredentialsRepository,
  IUserRepository,
  UserRepository,
} from '@core/db/repositories';
import Types from '@core/types';

import {
  AuthController,
  HealthController,
  UserController,
} from '@modules';
import {
  AuthenticateUseCase,
  GetMeUseCase,
  IAuthenticateUseCase,
  IGetMeUseCase,
  IRecoveryPasswordUseCase,
  IRefreshTokenUseCase,
  IResetPasswordUseCase,
  RecoveryPasswordUseCase,
  RefreshTokenUseCase,
  ResetPasswordUseCase,
} from '@modules/auth/use-cases';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserAllUseCase,
  GetUserUseCase,
  GetUserWithPaginationUseCase,
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserAllUseCase,
  IGetUserUseCase,
  IGetUserWithPaginationUseCase,
  IUpdateUserUseCase,
  UpdateUserUseCase,
} from '@modules/user/use-cases';

const container: Container = new Container();

// Repositories
container
  .bind<IAuthCredentialsRepository>(Types.AuthCredentialsRepository)
  .to(AuthCredentialsRepository);
container
  .bind<IUserRepository>(Types.UserRepository)
  .to(UserRepository);

// Contracts
container
  .bind<IAuthContract>(Types.AuthContract)
  .to(AuthContract);
container
  .bind<IMailContract>(Types.MailContract)
  .to(MailContract);

// Auth UseCases
container
  .bind<IAuthenticateUseCase>(Types.AuthenticateUseCase)
  .to(AuthenticateUseCase);
container
  .bind<IGetMeUseCase>(Types.GetMeUseCase)
  .to(GetMeUseCase);
container
  .bind<IRecoveryPasswordUseCase>(Types.RecoveryPasswordUseCase)
  .to(RecoveryPasswordUseCase);
container
  .bind<IRefreshTokenUseCase>(Types.RefreshTokenUseCase)
  .to(RefreshTokenUseCase);
container
  .bind<IResetPasswordUseCase>(Types.ResetPasswordUseCase)
  .to(ResetPasswordUseCase);

// User UseCases
container
  .bind<IDeleteUserUseCase>(Types.DeleteUserUseCase)
  .to(DeleteUserUseCase);
container
  .bind<IGetUserUseCase>(Types.GetUserUseCase)
  .to(GetUserUseCase);
container
  .bind<IGetUserAllUseCase>(Types.GetUserAllUseCase)
  .to(GetUserAllUseCase);
container
  .bind<IGetUserWithPaginationUseCase>(Types.GetUserWithPaginationUseCase)
  .to(GetUserWithPaginationUseCase);
container
  .bind<ICreateUserUseCase>(Types.CreateUserUseCase)
  .to(CreateUserUseCase);
container
  .bind<IUpdateUserUseCase>(Types.UpdateUserUseCase)
  .to(UpdateUserUseCase);

// Controllers
container
  .bind(AuthController)
  .toSelf();
container
  .bind(HealthController)
  .toSelf();
container
  .bind(UserController)
  .toSelf();

export { container };