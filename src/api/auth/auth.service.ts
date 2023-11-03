import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config';
import { HashService } from '../../common';
import { UserService } from '../user/user.service';
import type { User } from '../user/entities';
import type { RegisterPayload, LoginPayload, RefreshPayload } from './auth.types';
import type {
  TokenPayload,
  TokenData,
  TokenResponse,
  Token,
  CreateTokenPayload,
  CreateAccessTokenPayload,
  CreateTokenPairsPayload,
  VerifyAccessTokenData,
} from './jwt';

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

    return this.createTokenPairs({ id: user.id, login: user.login });
  }

  createToken<T>(payload: CreateTokenPayload<T>): Promise<Token> {
    const { id, ttl, payload: tokenPayload } = payload;

    return this.jwtService.signAsync(
      {
        sub: id,
        ...tokenPayload,
      } as TokenData,
      {
        secret: this.configService.jwt.secret,
        expiresIn: ttl,
      },
    );
  }

  async createTokenPairs(payload: CreateTokenPairsPayload): Promise<TokenResponse> {
    const { id, login } = payload;

    const [access, refresh] = await Promise.all([
      this.createToken<CreateAccessTokenPayload>({
        id,
        ttl: this.configService.jwt.accessTtl,
        payload: { login },
      }),

      this.createToken({
        id: id,
        ttl: this.configService.jwt.refreshTtl,
      }),
    ]);

    return { access, refresh };
  }

  validate(payload: TokenPayload): Promise<User | null> {
    console.log('validate payload', payload);

    return this.userService.getOneBy({ id: payload.sub });
  }

  async refresh(payload: RefreshPayload): Promise<TokenResponse> {
    const { refreshToken: token } = payload;

    try {
      const { sub: id } = await this.jwtService.verifyAsync<VerifyAccessTokenData>(token, {
        secret: this.configService.jwt.secret,
      });

      const user = await this.userService.getOneBy({ id });
      if (!user) {
        throw new Error("User doesn't exist");
      }

      return this.createTokenPairs({ id: user.id, login: user.login });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
