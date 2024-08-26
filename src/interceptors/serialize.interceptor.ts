import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common"
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"; 

// Type security
interface ClassConstructer{
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructer){
return UseInterceptors(new SerializerInterceptor(dto))
}

export class SerializerInterceptor implements NestInterceptor{
    constructor(private dto:any){

    }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data:any)=>{
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues:true,
                })
            })
        )
        
    }
}