import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyTables1754820544363 implements MigrationInterface {
    name = 'AddedManyTables1754820544363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."votes_type_enum" AS ENUM('up', 'down')`);
        await queryRunner.query(`ALTER TABLE "votes" ADD "type" "public"."votes_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "UQ_062aa0bc58308a13b5af7d42b25" UNIQUE ("userId", "feedbackId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "UQ_062aa0bc58308a13b5af7d42b25"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."votes_type_enum"`);
    }

}
