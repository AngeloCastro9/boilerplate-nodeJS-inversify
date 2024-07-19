import { RecoveryPasswordDTO } from '@modules/auth/dtos';

export interface IRecoveryPasswordUseCase {
  execute(dto: RecoveryPasswordDTO): Promise<void>;
}
