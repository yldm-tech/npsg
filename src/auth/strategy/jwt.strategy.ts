import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../user/constants';
import { IJwtPayload } from '../interface/jwt-payload.interface';
import IUserContext from '../interface/user-context.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtAuthStrategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUserContext> {
    const { email, roles, sub: userId } = payload;
    return { userId, email, roles };
  }
}
