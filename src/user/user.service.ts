import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = any;

@Injectable()
export class UserService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly users = [
    {
      id: 1,
      name: 'xiaomo',
      email: 'xiaomo@xiaomo.info',
      password: 'xiaomo',
      createdAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: 2,
      email: 'xiaomo@xiaomo.info',
      name: 'maria',
      password: 'guess',
      createdAt: new Date(),
      updateAt: new Date(),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1000s',
        algorithm: 'HS256',
        secret: 'secret',
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
      }),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('AuthService validateUser');
    const user = await this.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
