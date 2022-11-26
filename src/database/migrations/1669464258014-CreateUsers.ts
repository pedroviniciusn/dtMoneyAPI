import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1669464258014 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          }
        ],
        foreignKeys: [
          {
            name: 'Transactions',
            referencedTableName: 'transactions',
            referencedColumnNames: ['transactions'],
            columnNames: ['transactions'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
