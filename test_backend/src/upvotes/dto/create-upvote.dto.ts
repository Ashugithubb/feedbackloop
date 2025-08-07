import { IsNumber } from "class-validator";

export class CreateUpvoteDto {
    @IsNumber()
    userId:number

    @IsNumber()
    feedbackId:number
}
