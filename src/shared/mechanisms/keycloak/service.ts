import { getEnv } from '@core/constants';

import { GrantType } from '@shared/enumerators/grant-type';
import { IntegrationError } from '@shared/errors';
import {
  ClientRepresentation,
  GroupRepresentation,
  KeycloakCreateUserDTO,
  KeycloakResponse,
  KeycloakToken,
  KeycloakUpdateUserDTO,
  KeycloakUser,
  RealmRepresentation,
  RoleRepresentation,
} from '@shared/mechanisms/keycloak/dto';
import { getInstance } from '@shared/mechanisms/keycloak/instance';
import { IKeycloak } from '@shared/mechanisms/keycloak/interfaces';

class Keycloak implements IKeycloak {
  async auth (username: string, password: string): Promise<KeycloakToken> {
    let response = null;

    try {
      const { instance, config } = getInstance({ contentType: 'application/x-www-form-urlencoded' });

      const { data } = await instance.post(
        `/auth/realms/${config.realmName}/protocol/openid-connect/token/`,
        new URLSearchParams({
          client_id: getEnv().keycloak.client.id,
          client_secret: getEnv().keycloak.client.secret,
          grant_type: GrantType.PASSWORD,
          username,
          password,
        })
      );

      response = data;
    } catch (err) {
      throw new IntegrationError('keycloak', {
        origin: 'auth',
        err,
      });
    }

    return response;
  }

  async authServer (realm: string): Promise<KeycloakToken> {
    let response = null;

    try {
      const { instance } = getInstance({ contentType: 'application/x-www-form-urlencoded' });

      const { data } = await instance.post(
        `/auth/realms/${realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: getEnv().keycloak.client.id,
          client_secret: getEnv().keycloak.client.secret,
          grant_type: GrantType.CLIENT_CREDENTIALS,
        })
      );

      response = data;
    } catch (err) {
      throw new IntegrationError('keycloak', {
        origin: 'auth-server',
        err,
      });
    }

    return response;
  }

  async verifyToken (token: string): Promise<KeycloakUser> {
    let response = null;

    try {
      const { instance, config } = getInstance({ contentType: 'application/x-www-form-urlencoded' });

      const { data } = await instance.post(
        `/auth/realms/${config.realmName}/protocol/openid-connect/token/introspect/`,
        new URLSearchParams({
          client_id: getEnv().keycloak.client.id,
          client_secret: getEnv().keycloak.client.secret,
          token,
        })
      );

      response = data;
    } catch (err) {
      throw new IntegrationError('keycloak', {
        origin: 'introspect-auth',
        err,
      });
    }

    return response;
  }

  async refreshAuth (refreshToken: string): Promise<KeycloakToken> {
    let response = null;

    try {
      const { realm } = getEnv().keycloak;
      const { instance } = getInstance({ contentType: 'application/x-www-form-urlencoded' });

      const { data } = await instance.post(
        `/auth/realms/${realm.name}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: getEnv().keycloak.client.id,
          client_secret: getEnv().keycloak.client.secret,
          grant_type: GrantType.REFRESH_TOKEN,
          refresh_token: refreshToken,
        })
      );

      response = data;
    } catch (err) {
      throw new IntegrationError('keycloak', {
        origin: 'refresh-auth',
        err,
      });
    }

    return response;
  }

  async createUser (user: KeycloakCreateUserDTO): Promise<void> {
    try {
      const { realm } = getEnv().keycloak;
      const { access_token: accessToken } = await this.authServer(realm.name);
      const { instance } = getInstance({ token: accessToken });

      await instance.post(`/auth/admin/realms/${realm.name}/users`, {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName ?? '',
        enabled: true,
        emailVerified: true,
        credentials: [
          {
            type: 'password',
            value: user.password,
            temporary: false,
          },
        ],
        groups: user.groups,
        attributes: { isFirstAccess: true },
      });

    } catch (err) {
      throw new IntegrationError('keycloak', {
        origin: 'create-user',
        err,
      });
    }
  }

  async updateUser (id: string, user: KeycloakUpdateUserDTO): Promise<KeycloakResponse> {
    const response = null;

    try {
      const { realm } = getEnv().keycloak;
      const { access_token: accessToken } = await this.authServer(realm.name);
      const { instance } = getInstance({ token: accessToken });

      await instance.put(`/auth/admin/realms/${realm.name}/users/${id}`, {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        groups: user.groups,
        ...(user.password && {
          credentials: [
            {
              type: 'password',
              value: user.password,
              temporary: false,
            },
          ],
        }),
        attributes: { isFirstAccess: false },
      });

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'update-user',
        err,
      });
    }

    return response;
  }

  async resetPassword (id: string, password: string): Promise<void> {
    try {
      const { realm } = getEnv().keycloak;
      const { access_token: accessToken } = await this.authServer(realm.name);
      const { instance } = getInstance({ token: accessToken });

      await instance.put(`/auth/admin/realms/${realm.name}/users/${id}/reset-password`, {
        type: 'password',
        value: password,
        temporary: false,
      });

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'reset-password',
        err,
      });
    }
  }

  async deleteUserById (id: string): Promise<void> {
    try {
      const { realm } = getEnv().keycloak;
      const { access_token: accessToken } = await this.authServer(realm.name);

      const { instance } = getInstance({ token: accessToken });
      await instance.delete(`/auth/admin/realms/${realm.name}/users/${id}`);

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'delete-user-by-id',
        err,
      });
    }
  }

  async selectUserById (id: string): Promise<KeycloakUser> {
    let response = null;

    try {
      const { realm } = getEnv().keycloak;
      const { access_token: accessToken } = await this.authServer(realm.name);

      const { instance } = getInstance({ token: accessToken });
      response = await instance.get(`/auth/admin/realms/${realm.name}/users/${id}`);

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'select-user-by-id',
        err,
      });
    }

    return response;
  }

  async selectUserByEmail (email: string): Promise<KeycloakUser> {
    try {
      const { realm } = getEnv().keycloak;
      const { access_token: accessToken } = await this.authServer(realm.name);
      const { instance } = getInstance({ token: accessToken });

      const { data } = await instance.get(`/auth/admin/realms/${realm.name}/users/`, {
        params: {
          email,
        },
      });

      return data.at();
    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'select-user-by-id',
        err,
      });
    }
  }

  async addRealm (realm: string, token: string): Promise<void> {
    try {
      const { instance } = getInstance({ token });

      await instance.post('/auth/admin/realms', {
        id: realm,
        realm,
        enabled: true,
        loginWithEmailAllowed: false,
        duplicateEmailsAllowed: true,
        resetPasswordAllowed: false,
        editUsernameAllowed: true,
        bruteForceProtected: true,
        permanentLockout: false,
        maxFailureWaitSeconds: 900,
        minimumQuickLoginWaitSeconds: 60,
        waitIncrementSeconds: 60,
        quickLoginCheckMilliSeconds: 1000,
        maxDeltaTimeSeconds: 43200,
        failureFactor: 5,
      });

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'add-realm',
        err,
      });
    }
  }

  async addRole (role: string, description: string, token: string): Promise<void> {
    try {
      const { instance, config } = getInstance({ token });

      await instance.post(`/auth/admin/realms/${config.realmName}/roles`, {
        name: role,
        description,
      });

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'add-role',
        err,
      });
    }
  }

  async addRoleUser (userId: string, role: RoleRepresentation, token: string): Promise<void> {
    try {
      const { instance, config } = getInstance({ token });

      await instance.post(
        `/auth/admin/realms/${config.realmName}/users/${userId}/role-mappings/realm`,
        [ { ...role } ]
      );

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'add-role-user',
        err,
      });
    }
  }

  async deleteRoleUser (userId: string, role: RoleRepresentation, token: string): Promise<void> {
    try {
      const { instance, config } = getInstance({ token });

      await instance.delete(`/auth/admin/realms/${config.realmName}/users/${userId}/role-mappings/realm`, {
        data: [ { ...role } ],
      });

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'delete-role-user',
        err,
      });
    }
  }

  async getAllGroups (token: string): Promise<GroupRepresentation[]> {
    let response = null;

    try {
      const { instance, config } = getInstance({ token });

      const { data } = await instance.get(`/auth/admin/realms/${config.realmName}/groups`);
      response = data;

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'get-all-groups',
        err,
      });
    }

    return response;
  }

  async getAllClients (token: string): Promise<ClientRepresentation[]> {
    let response = null;

    try {
      const { instance, config } = getInstance({ token });

      const { data } = await instance.get(`/auth/admin/realms/${config.realmName}/clients`);
      response = data;

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'get-all-clients',
        err,
      });
    }

    return response;
  }

  async getAllRealms (token: string): Promise<RealmRepresentation[]> {
    let response = null;

    try {
      const { instance } = getInstance({ token });

      const { data } = await instance.get<RealmRepresentation[]>('/auth/admin/realms');
      response = data;

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'get-all-clients',
        err,
      });
    }

    return response;
  }

  async getAllRoles (token: string, search?: string): Promise<RoleRepresentation[]> {
    let response = null;

    try {
      const { instance, config } = getInstance({ token });

      const { data } = await instance.get(
        `/auth/admin/realms/${config.realmName}/roles`,
        {
          params: {
            search,
          },
        }
      );

      response = data;

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'get-all-roles',
        err,
      });
    }

    return response;
  }

  async getByIdRoles (id: string, token: string): Promise<RoleRepresentation> {
    let response = null;

    try {
      const { instance, config } = getInstance({ token });

      const { data } = await instance.get(`/auth/admin/realms/${config.realmName}/roles-by-id/${id}`);
      response = data;

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'get-by-id-roles',
        err,
      });
    }

    return response;
  }

  async deleteByIdRole (id: string, token: string): Promise<void> {
    try {
      const { instance, config } = getInstance({ token });
      await instance.delete(`/auth/admin/realms/${config.realmName}/roles-by-id/${id}`);

    } catch (err: unknown) {
      throw new IntegrationError('keycloak', {
        origin: 'delete-by-id-role',
        err,
      });
    }
  }
}

export default new Keycloak();
