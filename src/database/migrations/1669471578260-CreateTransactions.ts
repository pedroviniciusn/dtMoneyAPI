import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransactions1669471578260 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'category',
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
          },
        ],
        foreignKeys: [
          {
            name: 'User',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['users'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions')
  }
}
