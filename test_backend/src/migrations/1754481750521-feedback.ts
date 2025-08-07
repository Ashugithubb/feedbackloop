import { MigrationInterface, QueryRunner } from "typeorm";

export class Feedback1754481750521 implements MigrationInterface {
    name = 'Feedback1754481750521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_5db95b68a096db5884b270e70b4"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_4faa699712a857a26726accf88f"`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_5db95b68a096db5884b270e70b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_4faa699712a857a26726accf88f" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_4faa699712a857a26726accf88f"`);
        await queryRunner.query(`ALTER TABLE "users_comments" DROP CONSTRAINT "FK_5db95b68a096db5884b270e70b4"`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_4faa699712a857a26726accf88f" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_comments" ADD CONSTRAINT "FK_5db95b68a096db5884b270e70b4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
