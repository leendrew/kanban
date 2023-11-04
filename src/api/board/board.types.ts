import type { Board } from './entities';

export type CreateBoardPayload = Pick<Board, 'name'>;

export type GetBoardByPayload = Pick<Board, 'id'> | Pick<Board, 'name'>;
