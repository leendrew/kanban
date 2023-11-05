import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import type { Task } from './task.entity';
import type { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post('/')
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(): Promise<Task[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task | null> {
    return this.service.getOneBy({ id });
  }

  @Patch('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.service.updateOne(id, dto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteOne(id);
  }
}
