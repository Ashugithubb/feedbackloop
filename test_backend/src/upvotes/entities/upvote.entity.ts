import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("upvotes")
export class Upvote {
    @PrimaryGeneratedColumn()
    id:number
    

}
