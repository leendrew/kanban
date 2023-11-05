import type { Board } from './board.entity';

export type CreateBoardPayload = Pick<Board, 'name'>;

export type GetBoardByPayload = Pick<Board, 'id'> | Pick<Board, 'name'>;

type BoardWithoutMeta = Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'user'>;

export type UpdateBoardPayload = Partial<BoardWithoutMeta>;
