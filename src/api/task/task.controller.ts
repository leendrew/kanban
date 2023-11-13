import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import type { TaskModel } from './task.types';
import type { GetManyTasksQueryDto, CreateTaskDto, UpdateTaskDto } from './dto';
import { JwtGuard } from '../auth/jwt';

@UseGuards(JwtGuard)
@Controller('/tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post('/')
  create(@Body() dto: CreateTaskDto): Promise<TaskModel> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(@Query() query: GetManyTasksQueryDto): Promise<TaskModel[]> {
    const { name, isCompleted, boardId } = query;
    const payload = { name, isCompleted, board: { id: boardId } };

    return this.service.getAllBy(payload);
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskModel | null> {
    return this.service.getOneBy({ id });
  }

  @Patch('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto): Promise<TaskModel> {
    return this.service.updateOne(id, dto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<TaskModel> {
    return this.service.deleteOne(id);
  }
}
