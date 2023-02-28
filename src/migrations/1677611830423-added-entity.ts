import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677611830423 implements MigrationInterface {
    name = 'addedEntity1677611830423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "seats"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "seats" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "seats"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "seats" numeric NOT NULL`);
    }

}
