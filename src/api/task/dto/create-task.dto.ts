import { IsNotEmpty } from 'class-validator';
import type { CreateTaskPayload } from '../task.types';

export class CreateTaskDto implements CreateTaskPayload {
  @IsNotEmpty()
  name: string;
}
