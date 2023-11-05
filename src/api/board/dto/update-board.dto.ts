import { IsOptional } from 'class-validator';
import type { UpdateBoardPayload } from '../board.types';

export class UpdateBoardDto implements UpdateBoardPayload {
  @IsOptional()
  name?: string;

  @IsOptional()
  login?: string;

  @IsOptional()
  password?: string;
}
