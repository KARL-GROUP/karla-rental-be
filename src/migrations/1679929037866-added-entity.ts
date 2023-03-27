import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1679929037866 implements MigrationInterface {
    name = 'addedEntity1679929037866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" text DEFAULT '', CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_tag" ("car" uuid NOT NULL, "tag" uuid NOT NULL, CONSTRAINT "PK_534590a7ce095856c96476620e6" PRIMARY KEY ("car", "tag"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07d1a9dc193a4fe6c8afe3e919" ON "car_tag" ("car") `);
        await queryRunner.query(`CREATE INDEX "IDX_fae6994be6fb2469fa83ae474f" ON "car_tag" ("tag") `);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "coverImage" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "coverImage" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car_tag" ADD CONSTRAINT "FK_07d1a9dc193a4fe6c8afe3e919a" FOREIGN KEY ("car") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "car_tag" ADD CONSTRAINT "FK_fae6994be6fb2469fa83ae474fa" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_tag" DROP CONSTRAINT "FK_fae6994be6fb2469fa83ae474fa"`);
        await queryRunner.query(`ALTER TABLE "car_tag" DROP CONSTRAINT "FK_07d1a9dc193a4fe6c8afe3e919a"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "coverImage" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "coverImage" DROP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fae6994be6fb2469fa83ae474f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07d1a9dc193a4fe6c8afe3e919"`);
        await queryRunner.query(`DROP TABLE "car_tag"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
