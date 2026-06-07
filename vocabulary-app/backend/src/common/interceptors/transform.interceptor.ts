import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  meta?: any;
  errors?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res) => {
        // If response is already in correct format, return it
        if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
          return res;
        }

        // Handle pagination meta if exists
        const data = res && res.data !== undefined ? res.data : res;
        const meta = res && res.meta !== undefined ? res.meta : undefined;

        return {
          success: true,
          data,
          meta,
          errors: null,
        };
      }),
    );
  }
}
