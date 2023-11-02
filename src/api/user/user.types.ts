import type { User } from './entities';

export type CreateUserPayload = Pick<User, 'login' | 'name' | 'password'>;

export type GetUserByPayload = Pick<User, 'id'> | Pick<User, 'login'>;
