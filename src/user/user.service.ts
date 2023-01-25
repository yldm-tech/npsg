import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ICreateUserInput from './interface/create-user-input.interface';
import IUpdatePasswordInput from './interface/update-user-input.interface';
import { Role } from './user';

export type User = any;

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ email, encryptedPassword }: ICreateUserInput) {
    return this.prismaService.user.create({
      data: {
        email: email,
        name: email,
        password: encryptedPassword,
        roles: [Role.User, Role.Buyer],
      },
    });
  }

  async findOne(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: { email: email },
    });
  }

  async updateOne(uuid: number, updatePasswordInput: IUpdatePasswordInput) {
    const { newEncryptedPassword } = updatePasswordInput;
    const user = await this.findOne(uuid);
    if (!user) return null;
    await this.prismaService.user.update({
      where: {
        id: uuid,
      },
      data: {
        password: newEncryptedPassword,
      },
    });
    return user;
  }
}
