import { faker } from '@faker-js/faker';

import { UserEntity } from '@core/db/entities';

import { ProfileType } from '@shared/enumerators';
import { LuxonHelper } from '@shared/helpers';

export function makeUser (user?: UserEntity): UserEntity {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    profileType: ProfileType.ADMINISTRATOR,
    lastAccessAt: LuxonHelper.getCurrentDate(),
    deletedAt: null,
    deletedBy: null,
    ...user,
  };
}
