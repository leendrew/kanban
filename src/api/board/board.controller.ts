import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import type { Board } from './board.entity';
import type { CreateBoardDto } from './dto';

@Controller('/boards')
export class BoardController {
  constructor(private readonly service: BoardService) {}

  @Post('/')
  create(@Body() dto: CreateBoardDto): Promise<Board> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(): Promise<Board[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Board | null> {
    return this.service.getOneBy({ id });
  }
}
