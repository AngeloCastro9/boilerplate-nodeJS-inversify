import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from '@core/db/entities/base';
import { UserEntity } from '@core/db/entities/user';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  public corporateName?: string;

  @Column({ type: 'varchar', nullable: true })
  public fantasyName?: string;

  @OneToMany(() => UserEntity, (user) => user.company)
  public users: UserEntity[];
}