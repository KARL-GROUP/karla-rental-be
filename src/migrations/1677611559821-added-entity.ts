import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677611559821 implements MigrationInterface {
    name = 'addedEntity1677611559821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "car_images" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "car_images" SET DEFAULT ARRAY[]`);
    }

}
