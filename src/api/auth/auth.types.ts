import type { CreateUserPayload } from '../user/user.types';
import type { User } from '../user/entities';

export type RegisterPayload = CreateUserPayload;

export type LoginPayload = Pick<User, 'login' | 'password'>;
