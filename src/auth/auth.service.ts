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
import { Role } from '../user/user';
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

  async findUserFromContext(userContext: IUserContext) {
    return this.userService.findOne(userContext.userId);
  }

  async validateUser(username: string, pass: string) {
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

  async googleLogin(googleUser: GoogleUser) {
    if (!googleUser) {
      throw new BadRequestException('cannot get google user,please try again');
    }
    let user = await this.userService.findByGoogleId(googleUser.id);
    if (!user) {
      user = await this.userService.create({
        email: googleUser.email,
        name: googleUser.displayName,
        picture: googleUser.picture,
        googleId: googleUser.id,
        roles: [Role.User],
      });
    }

    if (!user) {
      throw new BadRequestException('google login failed,please try again');
    }

    const payload: IJwtPayload = {
      email: user.email,
      sub: parseInt(user.googleId),
      roles: [Role.User],
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    } as LoginResponse;
  }
}
