import { LoginResponse } from './dto/login-response.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from '../user/user';
import { LoginInput } from './dto/login-request.dto';
import { SignUpInput } from './dto/signup-request.dto';
import UpdatePasswordInput from './dto/update-password.request';
import { IJwtPayload } from './interface/jwt-payload.interface';
import IUserContext from './interface/user-context.interface';
import { ILoginResponse } from './interface/login-response.interface';
import { jwtConstants } from 'src/user/constants';
import { GoogleUser } from './dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupInput: SignUpInput) {
    const { email, password } = signupInput;
    const existed = await this.userService.findOneByEmail(email);
    if (existed) {
      throw new BadRequestException('user email is existed');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({
      email,
      encryptedPassword,
    });
  }

  async login(loginInput: LoginInput): Promise<ILoginResponse> {
    const { email, password } = loginInput;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('user email or password is wrong');
    }

    const payload: IJwtPayload = {
      email: user.email,
      sub: user.id,
      roles: user.roles,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    } as LoginResponse;
  }

  async findUserFromContext(
    userContext: IUserContext,
  ): Promise<UserEntity> | undefined {
    return this.userService.findOne(userContext.userId);
  }

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.findOneByEmail(username);
    const isPasswordCorrect = await bcrypt.compare(pass, user.password);
    if (user && isPasswordCorrect) {
      return user;
    }
    throw new BadRequestException('user email or password is wrong');
  }

  async updatePassword(uuid: number, updatePasswordInput: UpdatePasswordInput) {
    const { newPassword } = updatePasswordInput;
    const encryptedPassword = await bcrypt.hash(
      newPassword,
      this.configService.get('bcrypt').saltOrRounds || 10,
    );
    return this.userService.updateOne(uuid, {
      newEncryptedPassword: encryptedPassword,
    });
  }

  googleLogin(user: GoogleUser) {
    if (!user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: user,
    };
  }
}
