import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Task } from './entities';
import type { CreateTaskPayload, GetTaskByPayload } from './task.types';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly repository: Repository<Task>) {}

  async createOne(payload: CreateTaskPayload): Promise<Task> {
    try {
      const task = this.repository.create(payload);
      const createdTask = await this.repository.save(task);

      return createdTask;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneBy(payload: GetTaskByPayload): Promise<Task | null> {
    try {
      const task = await this.repository.findOneBy({ ...payload });

      return task;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAll(): Promise<Task[]> {
    try {
      const tasks = await this.repository.find();

      return tasks;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: number, payload: Partial<Task>) {
    try {
      await this.repository.update(id, payload);
      const updatedTask = await this.repository.findOneBy({ id });

      return updatedTask;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedTask = await this.repository.findOneBy({ id });
      await this.repository.delete({ id });

      return deletedTask;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
