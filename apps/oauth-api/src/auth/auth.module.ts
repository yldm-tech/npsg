import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './auth.constant';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwtAuthStrategy' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' }
    })
  ],

  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    GoogleStrategy
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
