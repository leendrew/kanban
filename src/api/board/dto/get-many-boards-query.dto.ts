import { IsOptional } from 'class-validator';
import { GetManyBoardsQuery } from '../board.types';

export class GetManyBoardsQueryDto implements GetManyBoardsQuery {
  @IsOptional()
  name?: string;

  @IsOptional()
  userId?: number;
}
