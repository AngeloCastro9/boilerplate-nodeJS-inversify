import { slug } from '@shared/utils';

export class KeycloakHelper {
  static normalizeRole (role: string) {
    return slug(role, '-', true);
  }
}