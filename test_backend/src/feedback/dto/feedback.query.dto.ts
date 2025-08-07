import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Score } from '../enum/scrore.enum';


export class GetFeedbackQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsArray()
  tags?: number[];

  @IsOptional()
  @IsArray()
  authors?: number[]

//   @IsString()
//  @IsOptional()
//   tags?: string

//   @IsString()
//    @IsOptional()
//   authors?: string

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}