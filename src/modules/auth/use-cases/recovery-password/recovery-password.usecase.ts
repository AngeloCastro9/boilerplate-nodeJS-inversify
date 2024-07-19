import { inject, injectable } from 'inversify';

import { IMailContract } from '@core/contracts';
import { IAuthCredentialsRepository } from '@core/db/repositories';
import Types from '@core/types';

import { RecoveryPasswordDTO } from '@modules/auth/dtos';
import { IRecoveryPasswordUseCase } from '@modules/auth/use-cases/recovery-password/recovery-password.interface';

import { AuthCredentialsType } from '@shared/enumerators';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';
import { LuxonHelper } from '@shared/helpers';
import KeycloakService from '@shared/mechanisms/keycloak/service';
import { generateRandomCode } from '@shared/utils';

@injectable()
export class RecoveryPasswordUseCase implements IRecoveryPasswordUseCase {
  constructor (
    @inject(Types.AuthCredentialsRepository)
    private readonly authCredentialsRepository: IAuthCredentialsRepository,

    @inject(Types.MailContract)
    private readonly mailContract: IMailContract
  ) {}

  async execute (dto: RecoveryPasswordDTO): Promise<void> {
    const user = await KeycloakService.selectUserByEmail(dto.email);

    if (!user) throw new BusinessError(BusinessErrorCodes.USER_NOT_FOUND);

    const { id } = user;

    const authCredentialsToCreate = {
      userId: id,
      token: generateRandomCode(3, 12),
      type: AuthCredentialsType.RECOVERY_PASSWORD_TOKEN,
      tokenExpiry: LuxonHelper.addHours(LuxonHelper.getCurrentDate(), 0.5),
      createdBy: 'SYSTEM',
      updatedBy: 'SYSTEM',
    };

    await this.authCredentialsRepository.create(authCredentialsToCreate);
  }
}
