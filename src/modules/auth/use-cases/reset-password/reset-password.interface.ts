import { ResetPasswordDTO } from '@modules/auth/dtos';

export interface IResetPasswordUseCase {
  execute(dto: ResetPasswordDTO): Promise<void>;
}
