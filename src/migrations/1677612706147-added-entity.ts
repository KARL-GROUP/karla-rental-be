import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677612706147 implements MigrationInterface {
    name = 'addedEntity1677612706147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "carImages"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "carImages" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "carImages"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "carImages" jsonb array NOT NULL`);
    }

}
