import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimestampInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const isCreate = req.method === 'POST';
    const isUpdate = req.method === 'PATCH' || req.method === 'PUT';

    return next.handle().pipe(
      tap((data) => {
        if (isCreate) data.createdAt = new Date();
        if (isUpdate) data.updatedAt = new Date();
      }),
    );
  }
}
