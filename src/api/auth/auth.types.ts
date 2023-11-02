import type { CreateUserPayload } from '../user/user.types';
import type { User } from '../user/entities';
import type { TokenResponse } from './jwt';

export type RegisterPayload = CreateUserPayload;

export type LoginPayload = Pick<User, 'login' | 'password'>;

export interface RefreshPayload {
  refreshToken: TokenResponse['refresh'];
}
