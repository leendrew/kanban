import type { UpdateTaskPayload } from '../task.types';

export class UpdateTaskDto implements UpdateTaskPayload {
  name?: string;

  isCompleted?: boolean;
}
