import { Feedback } from "src/feedback/entities/feedback.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("upvotes")
export class Upvote {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    votes:number

    @ManyToOne(()=>User)
    user:User

    @ManyToOne(()=>Feedback)
    feedback:Feedback
}
