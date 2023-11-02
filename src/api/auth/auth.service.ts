import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config';
import { HashService } from '../../common';
import { UserService } from '../user/user.service';
import type { User } from '../user/entities';
import type { RegisterPayload, LoginPayload } from './auth.types';
import type { TokenPayload, TokenData, TokenResponse } from '../jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(dto: RegisterPayload): Promise<User> {
    try {
      const { name, login, password } = dto;
      const hashedPassword = await this.hashService.hash(password);

      const createdUser = await this.userService.createOne({
        name,
        login,
        password: hashedPassword,
      });

      return createdUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async login(payload: LoginPayload): Promise<TokenResponse> {
    const { login, password } = payload;

    const user = await this.userService.getOneBy({ login });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isPasswordsEqual = await this.hashService.compare(password, user.password);
    if (!isPasswordsEqual) {
      throw new Error('Wrong password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        login: user.login,
      } as TokenData,
      {
        secret: this.configService.jwt.secret,
        expiresIn: this.configService.jwt.accessTtl,
      },
    );

    return { access: accessToken };
  }

  validate(payload: TokenPayload): Promise<User | null> {
    console.log('validate payload', payload);

    return this.userService.getOneBy({ id: payload.sub });
  }
}
