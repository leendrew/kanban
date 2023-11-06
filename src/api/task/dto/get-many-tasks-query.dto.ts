import { IsOptional } from 'class-validator';
import { GetManyTasksQuery } from '../task.types';

export class GetManyTasksQueryDto implements GetManyTasksQuery {
  @IsOptional()
  name?: string;

  @IsOptional()
  isCompleted?: boolean;

  @IsOptional()
  boardId?: number;
}
