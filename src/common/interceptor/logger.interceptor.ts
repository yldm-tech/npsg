import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const now = Date.now();
      const req = context.switchToHttp().getRequest();
      this.logger.debug(`============= Before: ${req.method} ${req.url}`);
      return next
        .handle()
        .pipe(
          tap(() =>
            this.logger.debug(`============= After =>  ${Date.now() - now}ms`),
          ),
        );
    } else {
      const now = Date.now();
      this.logger.debug(`============= Before: ${context.getHandler().name}`);
      return next
        .handle()
        .pipe(
          tap(() =>
            this.logger.debug(
              `============= After ${context.getHandler().name}=>  ${
                Date.now() - now
              }ms`,
            ),
          ),
        );
    }
  }
}
