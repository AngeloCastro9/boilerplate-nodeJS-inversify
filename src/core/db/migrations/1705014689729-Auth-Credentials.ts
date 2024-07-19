import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TypeormHelper } from '@shared/helpers';

export class AuthCredentials1705014689729 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('auth_credentials', queryRunner);

    if (hasTable) return;

    await queryRunner.createTable(
      new Table({
        name: 'auth_credentials',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'in4',
            isNullable: true,
          },
          {
            name: 'tokenExpiry',
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
            name: 'IDX_AUTH_CREDENTIALS',
            columnNames: [
              'id',
              'userId',
              'type',
              'token',
            ],
          }),
        ],
        foreignKeys: [
          {
            columnNames: [ 'userId' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'user',
          },
        ],
      })
    );
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const hasTable = await TypeormHelper.checkHasTable('auth_credentials', queryRunner);

    if (!hasTable) return;

    await TypeormHelper.dropTableForeignKeys('auth_credentials', [ 'userId' ], queryRunner);
    await TypeormHelper.dropIndex('auth_credentials', 'IDX_AUTH_CREDENTIALS', queryRunner);
    await queryRunner.dropTable('auth_credentials');
  }
}
