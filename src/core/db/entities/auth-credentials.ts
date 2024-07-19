import { Column, Entity, JoinColumn, ManyToOne, ObjectType } from 'typeorm';

import BaseEntity from '@core/db/entities/base';
import { UserEntity } from '@core/db/entities/user';

import { AuthCredentialsType } from '@shared/enumerators';

@Entity('auth_credentials')
export class AuthCredentialsEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  public userId?: string;

  @Column({ type: 'varchar', nullable: true })
  public token?: string;

  @Column({ type: 'int4', nullable: true })
  public type?: AuthCredentialsType;

  @Column({ type: 'timestamptz', nullable: true })
  public tokenExpiry?: Date;

  @ManyToOne((): ObjectType<UserEntity> => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user?: UserEntity;

  constructor (props: Partial<AuthCredentialsEntity>) {
    super();
    Object.assign(this, props);
  }
}
