import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import type { BoardModel } from './board.types';
import type { GetManyBoardsQueryDto, CreateBoardDto, UpdateBoardDto } from './dto';
import { JwtGuard } from '../auth/jwt';

@UseGuards(JwtGuard)
@Controller('/boards')
export class BoardController {
  constructor(private readonly service: BoardService) {}

  @Post('/')
  create(@Body() dto: CreateBoardDto): Promise<BoardModel> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(@Query() query: GetManyBoardsQueryDto): Promise<BoardModel | BoardModel[]> {
    const { name, userId } = query;
    const payload = { name, user: { id: userId } };

    return this.service.getAllBy(payload);
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BoardModel> {
    return this.service.getOneBy({ id });
  }

  @Patch('/:id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBoardDto,
  ): Promise<BoardModel> {
    return this.service.updateOne(id, dto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<BoardModel> {
    return this.service.deleteOne(id);
  }
}
