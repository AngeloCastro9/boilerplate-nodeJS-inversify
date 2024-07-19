import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TypeormHelper } from '@shared/helpers';

export class User1704990647193 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('user', queryRunner);

    if (hasTable) return;

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'companyId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'profileType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastAccessAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'createdBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deletedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        indices: [
          new TableIndex({
            name: 'IDX_USER',
            columnNames: [
              'id',
              'email',
              'name',
            ],
          }),
        ],
        foreignKeys: [
          {
            columnNames: [ 'companyId' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'company',
          },
        ],
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('user', queryRunner);

    if (!hasTable) return;

    await TypeormHelper.dropTableForeignKeys('user', [ 'companyId' ], queryRunner);
    await TypeormHelper.dropIndex('user', 'IDX_USER', queryRunner);
    await queryRunner.dropTable('user');
  }
}
