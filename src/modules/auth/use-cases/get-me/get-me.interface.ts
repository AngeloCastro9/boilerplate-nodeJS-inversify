import { UserEntity } from '@core/db/entities';

export interface IGetMeUseCase {
  execute(id: string): Promise<UserEntity>;
}
