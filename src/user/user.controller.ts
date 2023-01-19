import { Controller, Get } from '@nestjs/common';
import { User } from '../common/decorator/user.decorator';
import { UserEntity } from './user';

@Controller('user')
export class UserController {
  @Get()
  getUser(@User() user: UserEntity): UserEntity {
    return user;
  }
}
