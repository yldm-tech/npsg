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

  /**
   * 如果日志打印只有before没有after，说明这里handle处理有问题，导致请求没有返回
   * 调试方案：把这个拦截器在main中的app.useGlobalInterceptors()注释掉，然后再调试
   * 可能原因：DTO没有设置验证方案，导致validator不知道如何验证 如：@IsString()
   *
   *  export class CreateOrderDto {
   *    @IsString()
   *    name: string;
   *
   *    @IsString()
   *    description: string;
   * }
   *
   * @param context 上下文
   * @param next
   * @returns 下一个拦截器
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const now = Date.now();
      const req = context.switchToHttp().getRequest();
      const { query, body } = req;
      this.logger.debug(`=== Http Before: ${req.method} ${req.url}`);
      return next.handle().pipe(
        tap(() => {
          this.logger.debug(` ${JSON.stringify(query)}`);
          this.logger.debug(` ${JSON.stringify(body)}`);
          this.logger.debug(`=== After =>  ${Date.now() - now}ms`);
        }),
      );
    } else {
      const now = Date.now();
      this.logger.debug(`=== GQL Before: ${context.getHandler().name}`);
      return next.handle().pipe(
        tap(() => {
          this.logger.debug(
            `=== After ${context.getHandler().name}=>  ${Date.now() - now}ms`,
          );
        }),
      );
    }
  }
}
