import { FindConditions } from 'typeorm';

import { UserEntity } from '@core/db/entities';
import { ISearchParameterUser } from '@core/models/pagination';

export const getUserMatchSearch = (user: UserEntity, searchParameter: ISearchParameterUser) => {
  let matchCondition = false;

  if (searchParameter.name) {
    matchCondition = user.name === searchParameter.name;
  }

  if (searchParameter.email) {
    matchCondition = user.email === searchParameter.email;
  }

  return matchCondition;
};

export const getUserMatchCondition = (user: UserEntity, where: FindConditions<UserEntity>) => {
  let matchCondition = false;

  if (where.name) {
    matchCondition = user.name === where.name;
  }

  if (where.email) {
    matchCondition = user.email === where.email;
  }

  return matchCondition;
};