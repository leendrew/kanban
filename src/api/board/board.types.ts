import type { Board } from './board.entity';
import type { UserModel } from '../user/user.types';

export type BoardModel = Omit<Board, 'createdAt' | 'updatedAt'>;

type BoardWithoutRelations = Omit<BoardModel, 'tasks' | 'user'>;

type UserFk = { userId: UserModel['id'] };

export type CreateBoardPayload = Pick<BoardModel, 'name'> & UserFk;

export type GetManyBoardsQuery = Partial<Pick<BoardModel, 'name'> & UserFk>;

export type GetManyBoardsPayload = Partial<Omit<BoardWithoutRelations, 'id'>> & {
  user?: Partial<BoardModel['user']>;
};

export type GetBoardByPayload = Pick<BoardModel, 'id'> | Pick<BoardModel, 'name'>;

export type UpdateBoardPayload = Partial<Omit<BoardWithoutRelations, 'id'> & UserFk>;
