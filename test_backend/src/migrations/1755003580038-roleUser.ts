import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleUser1755003580038 implements MigrationInterface {
    name = 'RoleUser1755003580038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'User'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Admin'`);
    }

}
