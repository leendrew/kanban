import type { Board } from './board.entity';
import type { User } from '../user/user.entity';

type UserFk = { userId: User['id'] };

export type CreateBoardPayload = Pick<Board, 'name'> & UserFk;

export type GetManyBoardsQuery = Partial<Pick<Board, 'name'> & UserFk>;

export type GetManyBoardsPayload = Partial<Omit<BoardWithoutMeta, 'user'>> & {
  user?: Partial<Board['user']>;
};

export type GetBoardByPayload = Pick<Board, 'id'> | Pick<Board, 'name'>;

type BoardWithoutMeta = Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>;

export type UpdateBoardPayload = Partial<Omit<BoardWithoutMeta, 'user'> & UserFk>;
