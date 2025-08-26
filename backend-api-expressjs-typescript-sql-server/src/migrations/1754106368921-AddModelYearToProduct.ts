import { MigrationInterface, QueryRunner } from "typeorm";

export class AddModelYearToProduct1754106368921 implements MigrationInterface {
    name = 'AddModelYearToProduct1754106368921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "Batch193.dbo.products.year", "modelYear"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "Batch193.dbo.products.modelYear", "year"`);
    }

}
