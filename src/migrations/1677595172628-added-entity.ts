import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677595172628 implements MigrationInterface {
    name = 'addedEntity1677595172628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "car_images"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "car_images" jsonb array NOT NULL DEFAULT ARRAY[]::jsonb[]`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "car_images"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "car_images" text NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
