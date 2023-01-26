import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Logger,
  Res,
  Session,
  Sse,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Response } from 'express';
import { catchError, firstValueFrom, interval, map, Observable } from 'rxjs';
import { Cookies } from './common/decorator/cookie.decorator';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly httpService: HttpService) {}

  @Get()
  getHello(): string {
    return 'hello';
  }

  /**
   * http://localhost:3000/v1
   * @returns
   */
  @Get('hello')
  @Version('1')
  getHelloV1(): string {
    return 'hello v1';
  }

  /**
   * http://localhost:3000/v2
   * 1. 默认会返回一个 nest=true 的 cookie
   * 2. 在postman中的Headers中设置一个key为[Cookie],[value]为[name=nest]的参数，会在控制台打印出来
   * @returns
   */
  @Get('hello')
  @Version('2')
  getHelloV2(
    @Cookies('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ): string {
    response.cookie('nest', 'true');
    console.log('cookies name: ', name);
    return 'hello v2';
  }

  @Get('axios')
  async getFromAxios(): Promise<AxiosResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<any>('http://httpbin.org/get').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  @Get('/session')
  session(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log('session: ', session);
    return session;
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1 * 1000).pipe(
      map((index) => ({ data: { hello: 'world->' + index } } as MessageEvent)),
    );
  }
}
