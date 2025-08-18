import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, UpdateDateColumn } from "typeorm";
import { UpdateCommentDto } from "../dto/update-comment.dto";
import { Feedback } from "src/feedback/entities/feedback.entity";
import { User } from "src/user/entities/user.entity";
import { UserComment } from "src/user-comment/entities/user-comment.entity";

@Entity("comments")
@Tree("nested-set")
export class Comment {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    content:string

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @DeleteDateColumn()
    deletedAt:Date

    @ManyToOne(()=>Comment,(p)=>p.child)
    parent:Comment

    @OneToMany(()=>Comment,(c)=>c.parent)
    child:Comment[]


    @ManyToOne(()=>Feedback)
    feedback:Feedback


    @OneToMany(()=>UserComment,(u)=>u.comment)
    userComment:UserComment
    // @ManyToMany(()=>User)
    // user:User[]
}
