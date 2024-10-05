import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const response = http.getResponse() as Response;
    const statusCode = response.statusCode;
    const isOk = [200, 201].includes(statusCode);

    return next.handle().pipe(
      map((data) => ({
        ok: isOk,
        code: statusCode,
        data,
      })),
    );
  }
}
