import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Board } from './board.entity';
import type {
  CreateBoardPayload,
  GetManyBoardsPayload,
  GetBoardByPayload,
  UpdateBoardPayload,
} from './board.types';
import { UserService } from '../user/user.service';
import type { User } from '../user/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly repository: Repository<Board>,
    private readonly userService: UserService,
  ) {}

  async createOne(payload: CreateBoardPayload): Promise<Board> {
    const { name, userId } = payload;
    try {
      const user = await this.userService.getOneBy({ id: userId });
      if (!user) {
        throw new Error("User doesn't exist");
      }

      const board = this.repository.create({ name, user });
      const createdBoard = await this.repository.save(board);

      return createdBoard;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneBy(payload: GetBoardByPayload): Promise<Board | null> {
    try {
      const board = await this.repository.findOneBy(payload);

      return board;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllBy(payload: GetManyBoardsPayload): Promise<Board[]> {
    try {
      const boards = await this.repository.findBy(payload);

      return boards;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: Board['id'], payload: UpdateBoardPayload): Promise<Board> {
    try {
      const { name, userId } = payload;
      let user: User | undefined;

      if (userId) {
        const dbUser = await this.userService.getOneBy({ id: userId });
        if (!dbUser) {
          throw new Error("User doesn't exist");
        }
        user = dbUser;
      }

      await this.repository.update(id, { name, user });
      const updatedBoard = await this.repository.findOneBy({ id });

      return updatedBoard as Board;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: Board['id']): Promise<Board> {
    try {
      const deletedBoard = await this.repository.findOneBy({ id });
      if (!deletedBoard) {
        throw new Error("Board doesn't exist");
      }

      await this.repository.delete({ id });

      return deletedBoard;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
