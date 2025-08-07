import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Length, length } from "class-validator"
import { Status } from "../enum/status.enum"

export class CreateFeedbackDto {
    @IsString()
    @Length(3, 20, { message: 'title must be between 3 and 20 characters long' })
    title: string

    @IsString()
    description: string

    @IsOptional()
    @IsEnum(Status)
    status: Status

    @IsArray()
    @IsString({ each: true })
    tags: string[]
}
