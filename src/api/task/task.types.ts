import type { Task } from './task.entity';

export type CreateTaskPayload = Pick<Task, 'name'>;

export type GetTaskByPayload = Pick<Task, 'id'> | Pick<Task, 'name'>;

type TaskWithoutMeta = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'board'>;

export type UpdateTaskPayload = Partial<TaskWithoutMeta>;
