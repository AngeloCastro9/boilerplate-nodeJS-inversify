export interface Pagination<T> {
  rows: T[];
  count: number;
}

export interface ICount {
  count: number;
}

export interface ISearchParameterBase {
  offset?: number;
  orderBy?: string;
  isDESC?: boolean;
  limit?: number;
}

export interface ISearchParameterCompany extends ISearchParameterBase {
  corporateName?: string;
  fantasyName?: string;
}

export interface ISearchParameterUser extends ISearchParameterBase {
  companyId?: string;
  name?: string;
  email?: string;
}

export interface ISearchParameterQueuePriority extends ISearchParameterBase {
  critical?: string;
}