import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Task } from './task.entity';
import type {
  TaskModel,
  CreateTaskPayload,
  GetManyTasksPayload,
  GetTaskByPayload,
  UpdateTaskPayload,
} from './task.types';
import type { BoardModel } from '../board/board.types';
import { BoardService } from '../board/board.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
    private readonly boardService: BoardService,
  ) {}

  async createOne(payload: CreateTaskPayload): Promise<TaskModel> {
    const { name, boardId } = payload;
    try {
      const board = await this.boardService.getOneBy({ id: boardId });
      if (!board) {
        throw new Error("Board doesn't exist");
      }

      let index: number = 0;

      const existedTasks = await this.getAllBy({ board: { id: boardId } });
      const tasksLength = existedTasks.length;
      if (tasksLength) {
        index = tasksLength;
      }

      const task = this.repository.create({ name, board, index });
      const createdTask = await this.repository.save(task);

      return createdTask;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneBy(payload: GetTaskByPayload): Promise<TaskModel> {
    try {
      const task = await this.repository.findOneBy(payload);
      if (!task) {
        throw new Error("Task doesn't exist");
      }

      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllBy(payload: GetManyTasksPayload): Promise<TaskModel[]> {
    try {
      const tasks = await this.repository.find({
        where: payload,
        order: { index: 'asc' },
      });

      return tasks;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: Task['id'], payload: UpdateTaskPayload): Promise<TaskModel> {
    const { name, isCompleted, index, boardId } = payload;
    try {
      if (index !== undefined && index < 0) {
        throw new Error('Task index cannot be negative');
      }

      const currentTask = await this.getOneBy({ id });
      if (!currentTask) {
        throw new Error("Task doesn't exist");
      }

      if (index !== undefined) {
        const tasks = await this.getAllBy({ board: { id: currentTask.board.id } });
        if (index > tasks.length - 1) {
          throw new Error('Task index cannot be greater, than boards length');
        }
      }

      let board: BoardModel | undefined;

      if (boardId !== undefined) {
        const dbBoard = await this.boardService.getOneBy({ id: boardId });
        if (!dbBoard) {
          throw new Error("Board doesn't exist");
        }
        board = dbBoard;
      }

      await this.repository.update(id, { name, isCompleted, index, board });
      const updatedTask = await this.getOneBy({ id });

      return updatedTask as TaskModel;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: TaskModel['id']): Promise<TaskModel> {
    try {
      const deletedTask = await this.getOneBy({ id });
      if (!deletedTask) {
        throw new Error("Task doesn't exist");
      }

      await this.repository.delete({ id });

      return deletedTask;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
