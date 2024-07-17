import { IsBoolean,IsString, IsEmail, IsOptional, isEmail, isString } from "class-validator";

export class UpdateUser{ 
  
    @IsString()
    @IsOptional()
    firstName: string;
  
    @IsString()
    @IsOptional()
    lastName: string;
  
    @IsEmail()
    @IsOptional()
    email: string;
  
    @IsBoolean()
    @IsOptional()
    isActive: boolean;
  
    @IsString()
    @IsOptional()
    password: string;
}