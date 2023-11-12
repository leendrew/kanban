import type { UserModel, CreateUserPayload, UserWithoutRelations } from '../user/user.types';
import type { TokenResponse } from './jwt';

export type RegisterPayload = CreateUserPayload & { confirmPassword: UserModel['password'] };

export type LoginPayload = Pick<UserModel, 'login' | 'password'>;

export interface RefreshPayload {
  refreshToken: TokenResponse['refresh'];
}

export type AuthResponse = {
  user: Omit<UserWithoutRelations, 'password'>;
  tokens: TokenResponse;
};
