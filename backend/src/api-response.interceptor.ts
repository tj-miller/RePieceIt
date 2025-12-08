import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import type { ApiResponse } from '@shared/contracts/api-response';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<unknown>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        errors: [],
      }))
    );
  }
}
