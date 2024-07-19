import { ProfileType } from '@shared/enumerators';

export interface UpdateUserDTO {
  companyId?: string;
  name?: string;
  email?: string;
  profileType?: ProfileType;
  password?: string;
}