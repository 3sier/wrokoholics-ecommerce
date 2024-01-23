import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    console.log(payload);

    return { userId: payload.userId, username: payload.username };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
