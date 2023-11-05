import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../../config';
import { AuthService } from '../auth.service';
import type { User } from '../../user/user.entity';
import type { TokenPayload } from './jwt.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: TokenPayload): Promise<User | null> {
    return this.authService.validate(payload);
  }
}
