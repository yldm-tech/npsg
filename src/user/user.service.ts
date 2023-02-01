import { UserEntity } from 'src/user/user';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import ICreateUserInput from './interface/create-user-input.interface';
import IUpdatePasswordInput from './interface/update-user-input.interface';
import { Role } from './user';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 创建用户
   * @param email 邮箱
   * @param encryptedPassword 密码
   * @returns
   */
  create({
    email,
    name,
    encryptedPassword,
    googleId,
    roles,
    picture,
  }: ICreateUserInput): Promise<User | undefined> {
    return this.prismaService.user.create({
      data: {
        email: email,
        name: name || email,
        password: encryptedPassword,
        googleId: googleId,
        roles: roles,
        picture: picture,
      },
    });
  }

  /**
   *  根据id查找用户
   * @param userId userId
   * @returns user or null
   */
  async findOne(userId: number): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  /**
   * 根据email查找用户
   * @param email email
   * @returns user or null
   */
  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email: email },
    });
  }

  /**
   * 通过googleId查询是否有注册账号
   * @param googleId
   * @returns
   */
  findByGoogleId(googleId: string) {
    return this.prismaService.user.findUnique({
      where: {
        googleId: googleId,
      },
    });
  }

  /**
   * 更新用户密码
   * @param uuid 用户id
   * @param updatePasswordInput 用户输入的新密码
   * @returns user
   */
  async updateOne(
    uuid: number,
    updatePasswordInput: IUpdatePasswordInput,
  ): Promise<User | null> {
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
