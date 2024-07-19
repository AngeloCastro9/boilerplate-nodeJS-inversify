import { ProfileType } from '@shared/enumerators';

export interface CreateUserDTO {
  companyId: string;
  name: string;
  email: string;
  profileType: ProfileType;
  password: string;
}