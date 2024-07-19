import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthContract, IAuthContract } from '@core/contracts';
import { IUserRepository } from '@core/db/repositories';

import { CreateUserDTO } from '@modules/user/dtos/create-user.dto';
import { CreateUserUseCase, ICreateUserUseCase } from '@modules/user/use-cases/create';

import { makeSession, makeUser } from '@tests/factories';
import { UserRepositoryInMemory } from '@tests/repositories';

let createUserUseCase: ICreateUserUseCase;
let authContract: IAuthContract;
let userRepository: IUserRepository;

const mockUser = makeUser();
const mockSession = makeSession();

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    userRepository = new UserRepositoryInMemory();
    authContract = new AuthContract();
    createUserUseCase = new CreateUserUseCase(userRepository, authContract);
  });

  it('Should create user successfully', async () => {
    const result = await createUserUseCase.execute(
      mockUser as CreateUserDTO,
      mockSession
    );

    expect(result).toBeDefined();
  });
});