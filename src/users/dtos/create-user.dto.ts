import {
  IsEmail,
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsEmail()
  email: string;

  

  @IsString()
  @IsNotEmpty()
  password: string;
}
