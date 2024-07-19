import { faker } from '@faker-js/faker';

import { UserEntity } from '@core/db/entities';

import { ProfileType } from '@shared/enumerators';

export function makeSession (session?: UserEntity): UserEntity {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    profileType: ProfileType.ADMINISTRATOR,
    deletedAt: null,
    deletedBy: null,
    ...session,
  };
}
