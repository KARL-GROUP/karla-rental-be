import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677612130647 implements MigrationInterface {
    name = 'addedEntity1677612130647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "car_images"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "carImages" jsonb array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "seats"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "seats" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "seats"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "seats" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "carImages"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "car_images" jsonb array NOT NULL`);
    }

}
