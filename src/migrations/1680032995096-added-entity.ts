import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1680032995096 implements MigrationInterface {
    name = 'addedEntity1680032995096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_tag" DROP CONSTRAINT "FK_fae6994be6fb2469fa83ae474fa"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customerId" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "fullName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car_tag" ADD CONSTRAINT "FK_fae6994be6fb2469fa83ae474fa" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_tag" DROP CONSTRAINT "FK_fae6994be6fb2469fa83ae474fa"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "car_tag" ADD CONSTRAINT "FK_fae6994be6fb2469fa83ae474fa" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
