import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNaversProjects1615229918143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: 'navers_Projects',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'naver_id',
                        type: 'uuid'
                    },
                    {
                        name: 'project_id',
                        type: 'uuid'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKNaver',
                        referencedTableName: 'navers',
                        referencedColumnNames: ['id'],
                        columnNames: ['naver_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKProject',
                        referencedTableName: 'projects',
                        referencedColumnNames: ['id'],
                        columnNames: ['project_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('navers_Projects')
    }

}
