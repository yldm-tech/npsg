import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { LoginInput } from './dto/login-request.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import UpdatePasswordInput from './dto/update-password.request';
import IUserContext from './interface/user-context.interface';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@CurrentUser() user: IUserContext): Promise<User> {
    return this.authService.findUserFromContext(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/updatePassword')
  updatePassword(
    @CurrentUser() user: IUserContext,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ) {
    return this.authService.updatePassword(user.userId, updatePasswordInput);
  }
}
