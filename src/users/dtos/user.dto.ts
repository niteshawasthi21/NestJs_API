import { Expose } from "class-transformer";
export class UserDto{
    @Expose()
    id:number;

    @Expose()
    fullName:string;


    @Expose()
    email:string;
}