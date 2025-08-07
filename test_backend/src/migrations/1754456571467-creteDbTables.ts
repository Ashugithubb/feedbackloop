import { MigrationInterface, QueryRunner } from "typeorm";

export class CreteDbTables1754456571467 implements MigrationInterface {
    name = 'CreteDbTables1754456571467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "tagName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a0e006b29d7876b2f5a4df70a37" UNIQUE ("tagName"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedback_tags" ("id" SERIAL NOT NULL, "feedbackId" integer, "tagId" integer, CONSTRAINT "PK_46ff2013c46ae06623361f26a3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."feedback_status_enum" AS ENUM('Public', 'Private')`);
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."feedback_status_enum" NOT NULL DEFAULT 'Public', "upVotes" integer NOT NULL DEFAULT '0', "downVotes" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "parentId" integer, "feedbackId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_commented_user_users" ("commentsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_021ce5ddb33e6043272379df15f" PRIMARY KEY ("commentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3cb450e9a3d51515f2fa8f3d81" ON "comments_commented_user_users" ("commentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_539c1af305dcaef1b8d2ad0a03" ON "comments_commented_user_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "feedback_tags" ADD CONSTRAINT "FK_c8edf53ac0adb394449d7b35c55" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" ADD CONSTRAINT "FK_b609f0f33787cc32bffd36c55c4" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_a50590123a861952073d89e0a3f" FOREIGN KEY ("feedbackId") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_commented_user_users" ADD CONSTRAINT "FK_3cb450e9a3d51515f2fa8f3d816" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments_commented_user_users" ADD CONSTRAINT "FK_539c1af305dcaef1b8d2ad0a03f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_commented_user_users" DROP CONSTRAINT "FK_539c1af305dcaef1b8d2ad0a03f"`);
        await queryRunner.query(`ALTER TABLE "comments_commented_user_users" DROP CONSTRAINT "FK_3cb450e9a3d51515f2fa8f3d816"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_a50590123a861952073d89e0a3f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c"`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" DROP CONSTRAINT "FK_b609f0f33787cc32bffd36c55c4"`);
        await queryRunner.query(`ALTER TABLE "feedback_tags" DROP CONSTRAINT "FK_c8edf53ac0adb394449d7b35c55"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_539c1af305dcaef1b8d2ad0a03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cb450e9a3d51515f2fa8f3d81"`);
        await queryRunner.query(`DROP TABLE "comments_commented_user_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
        await queryRunner.query(`DROP TYPE "public"."feedback_status_enum"`);
        await queryRunner.query(`DROP TABLE "feedback_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
