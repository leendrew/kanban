import type { User } from '../user/entities';

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

export type Token = string;

export interface TokenResponse {
  access: Token;
}
