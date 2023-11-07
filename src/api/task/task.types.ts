import type { Task } from './task.entity';
import type { Board } from '../board/board.entity';

type BoardFk = { boardId: Board['id'] };

export type CreateTaskPayload = Pick<Task, 'name'> & BoardFk;

export type GetManyTasksQuery = Partial<Pick<Task, 'name' | 'isCompleted'> & BoardFk>;

export type GetManyTasksPayload = Partial<Omit<TaskWithoutMeta, 'board'>> & {
  board?: Partial<Task['board']>;
};

export type GetTaskByPayload = Pick<Task, 'id'> | Pick<Task, 'name'>;

type TaskWithoutMeta = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskPayload = Partial<Omit<TaskWithoutMeta, 'board'>> & BoardFk;
