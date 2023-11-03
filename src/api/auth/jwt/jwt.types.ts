import type { User } from '../../user/entities';

export interface TokenData {
  sub: User['id'];
  login: User['login'];
}

export interface TokenTime {
  iat: Date;
  exp: Date;
  // iss - publisher
  // aud - consumer
}

export type TokenPayload = TokenData & TokenTime;

export type CreateTokenPayload<T> = Pick<User, 'id'> & { ttl: number; payload?: T };

export type CreateAccessTokenPayload = Pick<User, 'login'>;

export type CreateTokenPairsPayload = Pick<User, 'id' | 'login'>;

export type VerifyAccessTokenData = Pick<TokenData, 'sub'>;

export type Token = string;

export interface TokenResponse {
  access: Token;
  refresh: Token;
}
