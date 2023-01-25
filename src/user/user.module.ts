import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  providers: [UserService, PrismaService],
})
export class UserModule {}
