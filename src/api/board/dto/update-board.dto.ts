import type { UpdateBoardPayload } from '../board.types';

export class UpdateBoardDto implements UpdateBoardPayload {
  name?: string;

  login?: string;

  password?: string;
}
