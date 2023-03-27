import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1679923853444 implements MigrationInterface {
    name = 'addedEntity1679923853444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text DEFAULT '', "email" character varying NOT NULL, "phone" text DEFAULT '', "description" text, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "plate"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "coverImage" jsonb`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "Brand" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "Model" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "Year" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "type" text`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "display" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TYPE "public"."cars_transmission_enum" RENAME TO "cars_transmission_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."cars_transmission_enum" AS ENUM('Manual', 'Automatic', 'Both')`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "transmission" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "transmission" TYPE "public"."cars_transmission_enum" USING "transmission"::"text"::"public"."cars_transmission_enum"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "transmission" SET DEFAULT 'Automatic'`);
        await queryRunner.query(`DROP TYPE "public"."cars_transmission_enum_old"`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "PK_2a1620737b2db91650ea040972d"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "PK_7df117f8090cc9d5e599c66a169" PRIMARY KEY ("car")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9542da28e12bddb7d553b5fa6d"`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD "category" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "PK_7df117f8090cc9d5e599c66a169"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "PK_2a1620737b2db91650ea040972d" PRIMARY KEY ("car", "category")`);
        await queryRunner.query(`CREATE INDEX "IDX_9542da28e12bddb7d553b5fa6d" ON "car_category" ("category") `);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9542da28e12bddb7d553b5fa6d"`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "PK_2a1620737b2db91650ea040972d"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "PK_7df117f8090cc9d5e599c66a169" PRIMARY KEY ("car")`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_9542da28e12bddb7d553b5fa6d" ON "car_category" ("category") `);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "PK_7df117f8090cc9d5e599c66a169"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "PK_2a1620737b2db91650ea040972d" PRIMARY KEY ("car", "category")`);
        await queryRunner.query(`CREATE TYPE "public"."cars_transmission_enum_old" AS ENUM('manual', 'automatic')`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "transmission" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "transmission" TYPE "public"."cars_transmission_enum_old" USING "transmission"::"text"::"public"."cars_transmission_enum_old"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "transmission" SET DEFAULT 'automatic'`);
        await queryRunner.query(`DROP TYPE "public"."cars_transmission_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."cars_transmission_enum_old" RENAME TO "cars_transmission_enum"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "display"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "Year"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "Model"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "Brand"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "coverImage"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "plate" character varying`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
