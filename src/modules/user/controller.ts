import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  IHttpActionResult,
  interfaces,
} from 'inversify-express-utils';

import { UserEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import { Pagination } from '@core/models/pagination';
import Types from '@core/types';

import { CreateUserDTO, UpdateUserDTO } from '@modules/user/dtos';
import { getUserFilter } from '@modules/user/helper';
import { CreateUserSchema, UpdateUserSchema } from '@modules/user/schemas';
import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IGetUserAllUseCase,
  IGetUserUseCase,
  IGetUserWithPaginationUseCase,
  IUpdateUserUseCase,
} from '@modules/user/use-cases';

import { ProfileType } from '@shared/enumerators';
import { authenticate, authorize, canManageUserInParams, schemaCheck, schemaValidate } from '@shared/middlewares';

@controller('/user')
export class UserController extends BaseHttpController implements interfaces.Controller {
  private readonly createUserUseCase: ICreateUserUseCase;
  private readonly updateUserUseCase: IUpdateUserUseCase;
  private readonly getUserUseCase: IGetUserUseCase;
  private readonly getUserAllUseCase: IGetUserAllUseCase;
  private readonly getUserWithPaginationUseCase: IGetUserWithPaginationUseCase;
  private readonly deleteUserUseCase: IDeleteUserUseCase;

  constructor (
    @inject(Types.CreateUserUseCase)
      createUserUseCase: ICreateUserUseCase,
    @inject(Types.UpdateUserUseCase)
      updateUserUseCase: IUpdateUserUseCase,
    @inject(Types.GetUserWithPaginationUseCase)
      getUserWithPaginationUseCase: IGetUserWithPaginationUseCase,
    @inject(Types.GetUserUseCase)
      getUserUseCase: IGetUserUseCase,
    @inject(Types.GetUserAllUseCase)
      getUserAllUseCase: IGetUserAllUseCase,
    @inject(Types.DeleteUserUseCase)
      deleteUserUseCase: IDeleteUserUseCase
  ) {
    super();
    this.createUserUseCase = createUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.getUserWithPaginationUseCase = getUserWithPaginationUseCase;
    this.getUserUseCase = getUserUseCase;
    this.getUserAllUseCase = getUserAllUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }

  @httpPost(
    '/',
    schemaCheck(CreateUserSchema),
    schemaValidate()
  )
  public async create (req: ICustomRequest): Promise<UserEntity> {
    return this.createUserUseCase.execute(
      req.body as CreateUserDTO,
      req.session as UserEntity
    );
  }

  @httpPut(
    '/:id',
    authenticate,
    schemaCheck(UpdateUserSchema),
    schemaValidate(),
    canManageUserInParams()
  )
  public async updateById (req: ICustomRequest): Promise<UserEntity> {
    return this.updateUserUseCase.execute(
      req.params.id,
      req.body as UpdateUserDTO,
      req.session as UserEntity
    );
  }

  @httpGet(
    '/',
    authenticate,
    authorize([ ProfileType.ADMINISTRATOR ])
  )
  public async getWithPagination (req: ICustomRequest): Promise<Pagination<UserEntity>> {
    const { searchParameter } = getUserFilter(req);

    return this.getUserWithPaginationUseCase.execute(searchParameter);
  }

  @httpGet('/all', authenticate)
  public async getAll (req: ICustomRequest): Promise<UserEntity[]> {
    const { searchParameter } = getUserFilter(req, false);

    return this.getUserAllUseCase.execute(searchParameter);
  }

  @httpGet('/:id', authenticate, canManageUserInParams())
  public async getById (req: ICustomRequest): Promise<UserEntity> {
    return this.getUserUseCase.execute(req.params.id);
  }

  @httpDelete('/:id', authenticate, canManageUserInParams())
  public async deleteById (req: ICustomRequest): Promise<IHttpActionResult> {
    await this.deleteUserUseCase.execute(
      req.params.id,
      req.session as UserEntity
    );

    return this.ok();
  }
}
