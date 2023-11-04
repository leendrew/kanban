import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from './entities';
import type { CreateUserPayload, GetUserByPayload } from './user.types';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async createOne(payload: CreateUserPayload): Promise<User> {
    try {
      const user = this.repository.create(payload);
      const createdUser = await this.repository.save(user);

      return createdUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneBy(payload: GetUserByPayload): Promise<User | null> {
    try {
      const user = await this.repository.findOneBy({ ...payload });

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.repository.find();

      return users;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: number, payload: Partial<User>): Promise<User | null> {
    try {
      await this.repository.update(id, payload);
      const updatedUser = await this.repository.findOneBy({ id });

      return updatedUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedUser = await this.repository.findOneBy({ id });
      await this.repository.delete({ id });

      return deletedUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
