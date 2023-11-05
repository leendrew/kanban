import type { User } from './user.entity';

export type CreateUserPayload = Pick<User, 'login' | 'name' | 'password'>;

export type GetUserByPayload = Pick<User, 'id'> | Pick<User, 'login'>;

type UserWithoutMeta = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'boards'>;

export type UpdateUserPayload = Partial<UserWithoutMeta>;
