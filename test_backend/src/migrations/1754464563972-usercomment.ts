import { MigrationInterface, QueryRunner } from "typeorm";

export class Usercomment1754464563972 implements MigrationInterface {
    name = 'Usercomment1754464563972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_comment_comments" ("usersId" integer NOT NULL, "commentsId" integer NOT NULL, CONSTRAINT "PK_789bb4ce2ee97a1e9b5409c9e43" PRIMARY KEY ("usersId", "commentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e8a952972d7c97d84c932a655f" ON "users_comment_comments" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8eb6959ebf3d50c6de4dbf637d" ON "users_comment_comments" ("commentsId") `);
        await queryRunner.query(`ALTER TABLE "users_comment_comments" ADD CONSTRAINT "FK_e8a952972d7c97d84c932a655ff" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_comment_comments" ADD CONSTRAINT "FK_8eb6959ebf3d50c6de4dbf637d0" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_comment_comments" DROP CONSTRAINT "FK_8eb6959ebf3d50c6de4dbf637d0"`);
        await queryRunner.query(`ALTER TABLE "users_comment_comments" DROP CONSTRAINT "FK_e8a952972d7c97d84c932a655ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8eb6959ebf3d50c6de4dbf637d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8a952972d7c97d84c932a655f"`);
        await queryRunner.query(`DROP TABLE "users_comment_comments"`);
    }

}
