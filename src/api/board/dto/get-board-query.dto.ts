import { IsOptional } from 'class-validator';
import { GetBoardQuery } from '../board.types';

export class GetBoardQueryDto implements GetBoardQuery {
  @IsOptional()
  name?: string;
}
