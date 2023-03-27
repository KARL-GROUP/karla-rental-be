import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1679931934812 implements MigrationInterface {
    name = 'addedEntity1679931934812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "Brand"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "Model"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "Year"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "brand" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "model" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "Year" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "Model" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "Brand" character varying NOT NULL`);
    }

}
