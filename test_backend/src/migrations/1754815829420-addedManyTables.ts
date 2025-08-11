import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyTables1754815829420 implements MigrationInterface {
    name = 'AddedManyTables1754815829420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "votes" integer NOT NULL, "userId" integer, "feedbackId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_5169384e31d0989699a318f3ca4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_c66b122b60fb0a6a07d86f63d32" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_c66b122b60fb0a6a07d86f63d32"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_5169384e31d0989699a318f3ca4"`);
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}
