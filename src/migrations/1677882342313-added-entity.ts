import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1677882342313 implements MigrationInterface {
    name = 'addedEntity1677882342313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_7df117f8090cc9d5e599c66a169"`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "PK_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "PK_403af40c78d667448b3af3aad36" PRIMARY KEY ("name", "id")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "PK_403af40c78d667448b3af3aad36"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_7df117f8090cc9d5e599c66a169" FOREIGN KEY ("car") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de"`);
        await queryRunner.query(`ALTER TABLE "car_category" DROP CONSTRAINT "FK_7df117f8090cc9d5e599c66a169"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "PK_403af40c78d667448b3af3aad36" PRIMARY KEY ("name", "id")`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "PK_403af40c78d667448b3af3aad36"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "PK_8b0be371d28245da6e4f4b61878" PRIMARY KEY ("name")`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_9542da28e12bddb7d553b5fa6de" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "car_category" ADD CONSTRAINT "FK_7df117f8090cc9d5e599c66a169" FOREIGN KEY ("car") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
