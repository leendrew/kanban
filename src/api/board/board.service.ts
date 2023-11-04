import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Board } from './entities';
import type { CreateBoardPayload, GetBoardByPayload } from './board.types';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) private readonly repository: Repository<Board>) {}

  async createOne(payload: CreateBoardPayload): Promise<Board> {
    try {
      const board = this.repository.create(payload);
      const createdBoard = await this.repository.save(board);

      return createdBoard;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getOneBy(payload: GetBoardByPayload): Promise<Board | null> {
    try {
      const board = await this.repository.findOneBy({ ...payload });

      return board;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async getAll(): Promise<Board[]> {
    try {
      const boards = await this.repository.find();

      return boards;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async updateOne(id: number, payload: Partial<Board>) {
    try {
      await this.repository.update(id, payload);
      const updatedBoard = await this.repository.findOneBy({ id });

      return updatedBoard;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteOne(id: number) {
    try {
      const deletedBoard = await this.repository.findOneBy({ id });
      await this.repository.delete({ id });

      return deletedBoard;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
