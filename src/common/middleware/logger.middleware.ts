import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, _: Response, next: (error?: any) => void): any {
    const { method, baseUrl, query, body } = req;
    if (req.originalUrl === '/graphql') {
      this.logger.debug(` ${method} ${baseUrl}`);
    } else {
      this.logger.debug(` ${method} ${baseUrl}`);
      this.logger.debug(` ${JSON.stringify(query)}`);
      this.logger.debug(` ${JSON.stringify(body)}`);
    }
    next();
  }
}
