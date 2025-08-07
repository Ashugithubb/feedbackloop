import { MigrationInterface, QueryRunner } from "typeorm";

export class Usercomment1754467003656 implements MigrationInterface {
    name = 'Usercomment1754467003656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_comments" ("id" SERIAL NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_86bdd51cd99741900baa293a80a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_5db95b68a096db5884b270e70b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_4faa699712a857a26726accf88f" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_4faa699712a857a26726accf88f"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_5db95b68a096db5884b270e70b4"`);
        await queryRunner.query(`DROP TABLE "users_comments"`);
    }

}
