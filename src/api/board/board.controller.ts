import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import type { Board } from './board.entity';
import type { CreateBoardDto, UpdateBoardDto } from './dto';

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

  @Patch('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoardDto) {
    return this.service.updateOne(id, dto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteOne(id);
  }
}
