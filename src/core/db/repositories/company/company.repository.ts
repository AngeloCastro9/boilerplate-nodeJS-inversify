import { injectable } from 'inversify';
import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { CompanyEntity } from '@core/db/entities';
import { getCompanyFilter } from '@core/db/repositories/company/company.filter';
import { ICompanyRepository } from '@core/db/repositories/company/company.interface';
import { ICount, ISearchParameterCompany, Pagination } from '@core/models/pagination';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class CompanyRepository implements ICompanyRepository {
  private companyRepository: Repository<CompanyEntity> = getRepository(CompanyEntity);

  async selectPagination (searchParameter: ISearchParameterCompany): Promise<Pagination<CompanyEntity>> {
    let response: Pagination<CompanyEntity> | null = null;

    const { where } = getCompanyFilter(searchParameter);

    try {
      const [ rows, count ] = await this.companyRepository.findAndCount({
        where,
        skip: searchParameter.offset,
        take: searchParameter.limit,
        order: {
          [searchParameter.orderBy]: searchParameter.isDESC ? 'DESC' : 'ASC',
        },
      });

      response = {
        rows,
        count,
      };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.PAGINATION_ENTITY, err);
    }

    return response;
  }

  async create (company: CompanyEntity): Promise<CompanyEntity> {
    let response: CompanyEntity | null = null;

    try {
      response = await this.companyRepository.save(company);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<CompanyEntity | null> {
    let response: CompanyEntity | null = null;

    try {
      response = await this.companyRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, company: CompanyEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.companyRepository.update(id, company);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async updateByWhere (where: FindConditions<CompanyEntity>, company:CompanyEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.companyRepository.update(where, company);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByWhere (where: FindConditions<CompanyEntity>): Promise<CompanyEntity | null> {
    let response: CompanyEntity | null = null;

    try {
      response = await this.companyRepository.findOne({ where });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<CompanyEntity>): Promise<(CompanyEntity | null)[]> {
    let response: CompanyEntity[] | null = null;

    try {
      response = await this.companyRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectOneByOptions (options?: FindManyOptions<CompanyEntity>): Promise<CompanyEntity | null> {
    let response: CompanyEntity | null = null;

    try {
      const [ company ] = await this.companyRepository.find({ ...options, take: 1 });
      response = company;

    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.companyRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async deleteByWhere (where: FindConditions<CompanyEntity>): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.companyRepository.softDelete(where);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async selectCount (searchParameter: ISearchParameterCompany): Promise<ICount> {
    let response: ICount | null = null;

    const { where } = getCompanyFilter(searchParameter);

    try {
      const count = await this.companyRepository.count({ where });
      response = { count };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.COUNT_ENTITY, err);
    }

    return response;
  }
}
