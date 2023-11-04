import type { Task } from './entities';

export type CreateTaskPayload = Pick<Task, 'name'>;

export type GetTaskByPayload = Pick<Task, 'id'> | Pick<Task, 'name'>;
