import { LoginResponse } from './dto/login-response.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginInput } from './dto/login-request.dto';
import { RegisterInput } from './dto/signup-request.dto';
import UpdatePasswordInput from './dto/update-password.request';
import { IJwtPayload } from './interface/jwt-payload.interface';
import { GoogleUser } from './dto/google-user.dto';
import { UserService } from '../user/user.service';
import { jwtConstants } from './auth.constant';
import {IUserContext} from '@lantron-ltd/npsg-utils';
import { Role } from '../user/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  }

  /**
   * 注册账号
   * @param signupInput 注册信息
   * @returns
   */
  async register(signupInput: RegisterInput) {
    const { email, password } = signupInput;
    const existed = await this.userService.findOneByEmail(email);
    if (existed) {
      throw new BadRequestException('user email is existed');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({
      email,
      encryptedPassword
    });
  }

  /**
   * 登陆
   * @param loginInput 登陆信息
   * @returns
   */
  async login(loginInput: LoginInput): Promise<LoginResponse> {
    console.log(loginInput);
    const { email, password } = loginInput;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('user email or password is wrong');
    }

    const payload: IJwtPayload = {
      email: user.email,
      sub: user.id,
      roles: user.roles
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: jwtConstants.secret
      })
    } as LoginResponse;
  }

  /**
   *
   * @param userContext 根据id获取用户信息
   * @returns
   */
  async findUserById(userContext: IUserContext) {
    return this.userService.findOne(userContext.userId);
  }

  /**
   * 验证用户合法性
   * @param username 用户名
   * @param pass
   * @returns
   */
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new NotFoundException('user not found,please register first');
    }
    const isPasswordCorrect = bcrypt.compare(pass, user.password);
    if (user && isPasswordCorrect) {
      return user;
    }
    throw new BadRequestException('user email or password is wrong');
  }

  /**
   * 修改用户密码
   * @param uuid uid
   * @param updatePasswordInput
   * @returns
   */
  async updatePassword(uuid: number, updatePasswordInput: UpdatePasswordInput) {
    const { newPassword } = updatePasswordInput;
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    return this.userService.updateOne(uuid, {
      newEncryptedPassword: encryptedPassword
    });
  }

  /**
   * google 登陆
   * @param googleUser google用户信息
   * @returns
   */
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
        roles: [Role.User]
      });
    }

    if (!user) {
      throw new BadRequestException('google login failed,please try again');
    }

    const payload: IJwtPayload = {
      email: user.email,
      sub: parseInt(user.googleId),
      roles: [Role.User]
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: jwtConstants.secret
      })
    } as LoginResponse;
  }
}
