import { AxiosInstance } from 'axios';
import ClientRepresentation from 'keycloak-admin/lib/defs/clientRepresentation';
import GroupRepresentation from 'keycloak-admin/lib/defs/groupRepresentation';
import RealmRepresentation from 'keycloak-admin/lib/defs/realmRepresentation';
import RoleRepresentation, { RoleMappingPayload } from 'keycloak-admin/lib/defs/roleRepresentation';

import { GrantType } from '@shared/enumerators';

interface KeycloakResponse {
  id: string;
}

interface KeycloakUser {
  id: string;
  sub: string;
  createdTimestamp: string;
  firstName: string;
  lastName: string;
  enabled: true;
  emailVerified: true;
  email: string;
  access: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };
  active: boolean;
}

interface KeycloakToken {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
}

interface KeycloakCreateUserDTO {
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  groups: string[];
}

interface KeycloakUpdateUserDTO {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  groups?: string[];
}

interface KeycloakInstance {
  instance: AxiosInstance;
  config: {
    grantType: GrantType;
    clientId: string;
    clientSecret: string;
    realmName: string;
  };
}

interface KeycloakInstanceOptions {
  token?: string;
  contentType?: string;
}

export {
  KeycloakUser,
  KeycloakResponse,
  KeycloakToken,
  KeycloakCreateUserDTO,
  KeycloakUpdateUserDTO,
  KeycloakInstance,
  ClientRepresentation,
  GroupRepresentation,
  RealmRepresentation,
  RoleRepresentation,
  RoleMappingPayload,
  KeycloakInstanceOptions,
};