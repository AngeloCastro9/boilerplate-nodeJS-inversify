import { ILike } from 'typeorm';

import { ISearchParameterCompany } from '@core/models/pagination';

export const getCompanyFilter = (searchParameter: ISearchParameterCompany) => {
  let where = {};

  if (searchParameter.corporateName) {
    where = { ...where, corporateName: ILike(`%${searchParameter.corporateName}%`) };
  }

  if (searchParameter.fantasyName) {
    where = { ...where, fantasyName: ILike(`%${searchParameter.fantasyName}%`) };
  }

  return { where };
};
