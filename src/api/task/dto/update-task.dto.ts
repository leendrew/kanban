import { IsOptional } from 'class-validator';
import type { UpdateTaskPayload } from '../task.types';

export class UpdateTaskDto implements UpdateTaskPayload {
  @IsOptional()
  name?: string;

  @IsOptional()
  isCompleted?: boolean;
}
