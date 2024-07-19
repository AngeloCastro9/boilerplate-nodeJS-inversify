const Types = {
  // Repositories
  AuthCredentialsRepository: 'AuthCredentialsRepository',
  UserRepository: 'UserRepository',

  // Contracts
  AuthContract: 'AuthContract',
  MailContract: 'MailContract',

  // Auth Use Cases
  AuthenticateUseCase: 'AuthenticateUseCase',
  RefreshTokenUseCase: 'RefreshTokenUseCase',
  RecoveryPasswordUseCase: 'RecoveryPasswordUseCase',
  ResetPasswordUseCase: 'ResetPasswordUseCase',
  GetMeUseCase: 'GetMeUseCase',

  // User Use Cases
  CreateUserUseCase: 'CreateUserUseCase',
  UpdateUserUseCase: 'UpdateUserUseCase',
  GetUserUseCase: 'GetUserUseCase',
  GetUserAllUseCase: 'GetUserAllUseCase',
  GetUserWithPaginationUseCase: 'GetUserWithPaginationUseCase',
  DeleteUserUseCase: 'DeleteUserUseCase',
};

export default Types;
