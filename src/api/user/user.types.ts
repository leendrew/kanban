import type { User } from './user.entity';

export type UserModel = Omit<User, 'createdAt' | 'updatedAt'>;

export type UserWithoutRelations = Omit<UserModel, 'boards'>;

export type CreateUserPayload = Pick<UserModel, 'login' | 'name' | 'password'>;

export type GetUserQuery = Partial<Pick<UserModel, 'login'>>;

export type GetUserByPayload = Pick<UserModel, 'id'> | Pick<UserModel, 'login'>;

export type UpdateUserPayload = Partial<Omit<UserWithoutRelations, 'id'>>;
