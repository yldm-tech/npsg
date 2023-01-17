import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void): any {
    const { method, path, query, body } = req;
    console.log(` ${method} ${path}`);
    console.log(`query: ${JSON.stringify(query)}`);
    console.log(`body: ${JSON.stringify(body)}`);
    next();
  }
}
