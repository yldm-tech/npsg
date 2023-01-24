import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../common/decorator/user.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserEntity } from './user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@User() user: UserEntity): UserEntity {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    console.log('UserController getProfile', req.user);
    return req.user;
  }
}
