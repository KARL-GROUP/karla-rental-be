import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677068295586 implements MigrationInterface {
    name = 'addedEntity1677068295586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8b0be371d28245da6e4f4b61878" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('approved', 'pending', 'declined')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "phone" character varying NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "car_id" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cars_transmission_enum" AS ENUM('manual', 'automatic')`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "plate" character varying NOT NULL, "transmission" "public"."cars_transmission_enum" NOT NULL DEFAULT 'automatic', "price" numeric NOT NULL, "seats" numeric NOT NULL, "car_images" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_category" ("car" uuid NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_2a1620737b2db91650ea040972d" PRIMARY KEY ("car", "category"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7df117f8090cc9d5e599c66a16" ON "car_category" ("car") `);
        await queryRunner.query(`CREATE INDEX "IDX_9542da28e12bddb7d553b5fa6d" ON "car_category" ("category") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_27c181815feb0f7be963742d577" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_7df117f8090cc9d5e599c66a169" FOREIGN KEY ("car") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_7df117f8090cc9d5e599c66a169"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_27c181815feb0f7be963742d577"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9542da28e12bddb7d553b5fa6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7df117f8090cc9d5e599c66a16"`);
        await queryRunner.query(`DROP TABLE "car_category"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TYPE "public"."cars_transmission_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
