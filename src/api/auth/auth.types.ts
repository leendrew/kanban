import type { CreateUserPayload } from '../user/user.types';
import type { User } from '../user/user.entity';
import type { TokenResponse } from './jwt';

export type RegisterPayload = CreateUserPayload & { confirmPassword: User['password'] };

export type LoginPayload = Pick<User, 'login' | 'password'>;

export interface RefreshPayload {
  refreshToken: TokenResponse['refresh'];
}
