import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Board } from './board.entity';
import type {
  BoardModel,
  CreateBoardPayload,
  GetManyBoardsPayload,
  GetBoardByPayload,
  UpdateBoardPayload,
} from './board.types';
import { UserService } from '../user/user.service';
import type { UserModel } from '../user/user.types';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly repository: Repository<Board>,
    private readonly userService: UserService,
  ) {}

  async createOne(payload: CreateBoardPayload): Promise<BoardModel> {
    const { name, userId } = payload;
    try {
      const user = await this.userService.getOneBy({ id: userId });
      if (!user) {
        throw new Error("User doesn't exist");
      }

      let index: number = 0;

      const existedBoards = await this.getAllBy({ user: { id: user.id } });
      const boardsLength = existedBoards.length;
      if (boardsLength) {
        index = boardsLength;
      }

      const board = this.repository.create({ name, user, index });
      const createdBoard = await this.repository.save(board);

      return createdBoard;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneBy(payload: GetBoardByPayload): Promise<BoardModel> {
    try {
      const board = await this.repository.findOne({
        where: payload,
        order: { tasks: { index: 'asc' } },
      });
      if (!board) {
        throw new Error("Board doesn't exist");
      }

      return board;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneByWithRelations(payload: GetBoardByPayload): Promise<BoardModel> {
    try {
      const board = await this.repository
        .createQueryBuilder('b')
        .select(['b.id', 'b.name', 'b.index', 'u.id'])
        .leftJoin('b.user', 'u')
        .where(payload)
        .getOne();
      if (!board) {
        throw new Error("Board doesn't exist");
      }

      return board;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAllBy(payload: GetManyBoardsPayload): Promise<BoardModel[]> {
    try {
      const boards = await this.repository.find({
        where: payload,
        order: { index: 'asc', tasks: { index: 'asc' } },
      });

      return boards;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: BoardModel['id'], payload: UpdateBoardPayload): Promise<BoardModel> {
    const { name, userId, index } = payload;
    try {
      if (index !== undefined && index < 0) {
        throw new Error('Board index cannot be negative');
      }

      const currentBoard = await this.getOneByWithRelations({ id });
      console.log(currentBoard);

      if (index !== undefined) {
        const boards = await this.getAllBy({ user: { id: currentBoard.user.id } });
        if (index > boards.length - 1) {
          throw new Error('Board index cannot be greater, than boards length');
        }
      }

      let user: UserModel | undefined;

      if (userId !== undefined) {
        const dbUser = await this.userService.getOneBy({ id: userId });
        if (!dbUser) {
          throw new Error("User doesn't exist");
        }
        user = dbUser;
      }

      await this.repository.update(id, { name, index, user });
      const updatedBoard = await this.getOneBy({ id });

      return updatedBoard as BoardModel;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: BoardModel['id']): Promise<BoardModel> {
    try {
      const deletedBoard = await this.getOneBy({ id });
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
