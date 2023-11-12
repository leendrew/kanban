import type { Board } from './board.entity';
import type { UserModel } from '../user/user.types';

export type BoardModel = Omit<Board, 'createdAt' | 'updatedAt'>;

type UserFk = { userId: UserModel['id'] };

export type CreateBoardPayload = Pick<BoardModel, 'name'> & UserFk;

export type GetManyBoardsQuery = Partial<Pick<BoardModel, 'name'> & UserFk>;

export type GetManyBoardsPayload = Partial<Omit<BoardWithoutMeta, 'user'>> & {
  user?: Partial<BoardModel['user']>;
};

export type GetBoardByPayload = Pick<BoardModel, 'id'> | Pick<BoardModel, 'name'>;

type BoardWithoutMeta = Omit<BoardModel, 'id' | 'tasks'>;

export type UpdateBoardPayload = Partial<Omit<BoardWithoutMeta, 'user'> & UserFk>;
