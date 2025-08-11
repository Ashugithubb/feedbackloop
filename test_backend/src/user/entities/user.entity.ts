import { Comment } from "src/comment/entities/comment.entity";
import { Feedback } from "src/feedback/entities/feedback.entity";
import { UserComment } from "src/user-comment/entities/user-comment.entity";
import { Votes } from "src/votes/entities/vote.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    userName:string

    @Column({unique:true})
    email:string

    @Column({select:false})
    password:string

    @CreateDateColumn()
    createdAt:Date
    
    @OneToMany(()=>Feedback,(f)=>f.user)
    feedback:Feedback[]

  @OneToMany(() => Votes, vote => vote.user)
    votes: Votes[];
    
  @OneToMany(()=>UserComment,(u)=>u.user)
    userComment:UserComment[]
}
