import {
  Controller,
  Get,
  Logger,
  Res,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { Cookies } from './common/decorator/cookie.decorator';
import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

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
  @Get()
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
  @Get()
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
}
