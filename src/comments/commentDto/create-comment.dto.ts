import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommentDto {
  @IsNumber()
  @IsOptional() 
  historyId: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsOptional()
  isPosted?: boolean;
}
