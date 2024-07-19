import { ICustomRequest } from '@core/models/custom-request';
import { ISearchParameterUser } from '@core/models/pagination';

import { controllerPaginationHelper } from '@shared/utils';

export const getUserFilter = (req: ICustomRequest, pagination = true) => {
  const searchParameter: ISearchParameterUser = {
    ...(req.query &&
      req.query.companyId && {
      companyId: req.query.companyId.toString(),
    }),
    ...(req.query &&
      req.query.name && {
      name: req.query.name.toString(),
    }),
    ...(req.query &&
      req.query.email && {
      email: req.query.email.toString(),
    }),
    ...(req.query &&
      req.query.personalDocument && {
      personalDocument: req.query.personalDocument.toString(),
    }),
    ...(req.query &&
      req.query.phone && {
      phone: req.query.phone.toString(),
    }),
    ...controllerPaginationHelper(req.query),
  };

  if (!pagination) {
    delete searchParameter.offset;
    delete searchParameter.limit;
  }

  return { searchParameter };
};