import { MigrationInterface, QueryRunner } from "typeorm";

export class V0tes1754820677972 implements MigrationInterface {
    name = 'V0tes1754820677972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP COLUMN "votes"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" ADD "votes" integer NOT NULL`);
    }

}
