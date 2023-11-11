import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from './user.entity';
import type {
  UserWithoutBoards,
  CreateUserPayload,
  GetUserByPayload,
  UpdateUserPayload,
} from './user.types';
import { HashService } from '../../common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

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
      const user = await this.repository.findOne({
        where: payload,
        order: { boards: { index: 'asc', tasks: { index: 'asc' } } },
      });

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneByWithPassword(payload: GetUserByPayload): Promise<UserWithoutBoards | null> {
    try {
      const user = await this.repository
        .createQueryBuilder('u')
        .select(['u.id', 'u.name', 'u.login'])
        .addSelect('u.password')
        .where(payload)
        .getOne();

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.repository.find({
        order: { id: 'asc', boards: { index: 'asc', tasks: { index: 'asc' } } },
      });

      return users;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: User['id'], payload: UpdateUserPayload): Promise<User> {
    try {
      if (payload.password) {
        payload.password = await this.hashService.hash(payload.password);
      }
      await this.repository.update(id, payload);
      const updatedUser = await this.getOneBy({ id });

      return updatedUser as User;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: User['id']): Promise<User> {
    try {
      const deletedUser = await this.getOneBy({ id });
      if (!deletedUser) {
        throw new Error("User doesn't exist");
      }

      await this.repository.delete({ id });

      return deletedUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
