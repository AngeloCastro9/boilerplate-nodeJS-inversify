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

export interface IKeycloak {
  auth(username: string, password: string): Promise<KeycloakToken>;
  authServer(realm: string): Promise<KeycloakToken>;
  verifyToken(token: string): Promise<KeycloakUser>;
  refreshAuth(refreshToken: string): Promise<KeycloakToken>;
  resetPassword (id: string, password: string): Promise<void>;
  createUser(user: KeycloakCreateUserDTO): Promise<void>;
  updateUser (id: string, user: KeycloakUpdateUserDTO): Promise<KeycloakResponse>
  deleteUserById(id: string): Promise<void>;
  selectUserById(id: string): Promise<KeycloakUser>;

  addRealm(realm: string, token: string): Promise<void>;
  addRole(role: string, description: string, token: string): Promise<void>;
  addRoleUser(userId: string, role: RoleRepresentation, token: string): Promise<void>;
  getByIdRoles(id: string, token: string): Promise<RoleRepresentation>;
  getAllClients(token: string): Promise<ClientRepresentation[]>;
  getAllGroups(token: string): Promise<GroupRepresentation[]>;
  getAllRealms(token: string): Promise<RealmRepresentation[]>;
  getAllRoles(token: string, search?: string): Promise<RoleRepresentation[]>;
  deleteByIdRole(id: string, token: string): Promise<void>;
}