import { Column, Entity, JoinColumn, ManyToOne, ObjectType } from 'typeorm';

import BaseEntity from '@core/db/entities/base';
import { CompanyEntity } from '@core/db/entities/company';

import { ProfileType } from '@shared/enumerators';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  public companyId?: string;

  @Column({ type: 'varchar', nullable: true })
  public name?: string;

  @Column({ type: 'varchar', nullable: true })
  public email?: string;

  @Column({ type: 'varchar', nullable: true })
  public profileType?: ProfileType;

  @Column({ type: 'timestamptz', nullable: true })
  public lastAccessAt?: Date;

  @ManyToOne((): ObjectType<CompanyEntity> => CompanyEntity)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  public company?: CompanyEntity;

  constructor (props: Partial<UserEntity>) {
    super();
    Object.assign(this, props);
  }
}
