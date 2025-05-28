import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTable1748407162017 implements MigrationInterface {
  name = 'InitTable1748407162017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."totes_color_enum" AS ENUM('black', 'blue', 'brown', 'red')`,
    );
    await queryRunner.query(
      `CREATE TABLE "totes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "material" character varying NOT NULL, "size" character varying NOT NULL, "color" "public"."totes_color_enum" NOT NULL, "rating" double precision, "isNewArrival" boolean NOT NULL DEFAULT false, "isBestSeller" boolean NOT NULL DEFAULT false, "inStock" boolean NOT NULL DEFAULT false, "style" text NOT NULL, "price" double precision NOT NULL DEFAULT '0', "bannerURL" character varying NOT NULL DEFAULT '""', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_943e0dd53ee19fccf185e8e4403" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "totes"`);
    await queryRunner.query(`DROP TYPE "public"."totes_color_enum"`);
  }
}
