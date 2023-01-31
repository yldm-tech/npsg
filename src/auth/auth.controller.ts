import { SignUpInput } from './dto/signup-request.dto';
import { UserEntity } from 'src/user/user';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { LoginInput } from './dto/login-request.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import UpdatePasswordInput from './dto/update-password.request';
import IUserContext from './interface/user-context.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupInput: SignUpInput) {
    return this.authService.signup(signupInput);
  }

  @Post('/login')
  async login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/profile')
  getProfile(@CurrentUser() user: IUserContext): Promise<UserEntity> {
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

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('just use the endpoint');
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req.user);
  }
}
