import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
// import { UserDto } from 'src/users/dtos/user.dto';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // console.log('I m running before handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run before the response is sent out
        // console.log('I m running before the response is sent out', data);

        return plainToInstance(this.dto, data, {
          // Exclude password from response
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
