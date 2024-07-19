import { DeleteResult, FindConditions, FindManyOptions, UpdateResult } from 'typeorm';

import { CompanyEntity } from '@core/db/entities';
import { ICount, ISearchParameterCompany, Pagination } from '@core/models/pagination';

export interface ICompanyRepository {
  create(user: CompanyEntity): Promise<CompanyEntity>;
  updateById(id: string, user: CompanyEntity): Promise<UpdateResult>;
  updateByWhere(where: FindConditions<CompanyEntity>, user: CompanyEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<CompanyEntity | null>;
  selectByWhere(where: FindConditions<CompanyEntity>): Promise<CompanyEntity | null>;
  selectPagination(searchParameter: ISearchParameterCompany): Promise<Pagination<CompanyEntity>>;
  selectByOptions(options?: FindManyOptions<CompanyEntity>): Promise<(CompanyEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<CompanyEntity>): Promise<CompanyEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
  deleteByWhere(where: FindConditions<CompanyEntity>): Promise<DeleteResult>;
  selectCount(searchParameter: ISearchParameterCompany): Promise<ICount>;
}
