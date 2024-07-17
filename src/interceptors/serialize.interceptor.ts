import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common"
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


export class SerializerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('I am running before te ndller',context);

        return next.handle().pipe(
            map((data:any)=>{
                console.log('I am running before tHe redponde send out',data )
            })
        )
        
    }
}