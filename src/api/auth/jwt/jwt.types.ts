import type { UserModel } from '../../user/user.types';

export interface TokenData {
  sub: UserModel['id'];
  login: UserModel['login'];
}

export interface TokenTime {
  iat: Date;
  exp: Date;
  // iss - publisher
  // aud - consumer
}

export type TokenPayload = TokenData & TokenTime;

export type CreateTokenPayload<T> = Pick<UserModel, 'id'> & { ttl: number; payload?: T };

export type CreateAccessTokenPayload = Pick<UserModel, 'login'>;

export type CreateTokenPairsPayload = Pick<UserModel, 'id' | 'login'>;

export type VerifyAccessTokenData = Pick<TokenData, 'sub'>;

export type Token = string;

export interface TokenResponse {
  access: Token;
  refresh: Token;
}
