import { RegisterInput } from './dto/signup-request.dto';
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
import { LoginInput } from './dto/login-request.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import UpdatePasswordInput from './dto/update-password.request';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import IUserContext from '@lantron-ltd/npsg-utils/src/interface/user-context.interface';
import { CurrentUser } from '@lantron-ltd/npsg-utils/src/decorator/current-user.decorator';
import { UserEntity } from '../user/user';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Post('/login')
  async login(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/profile')
  getProfile(@CurrentUser() user: IUserContext): Promise<UserEntity> {
    return this.authService.findUserById(user);
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
