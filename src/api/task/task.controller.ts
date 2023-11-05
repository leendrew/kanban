import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import type { Task } from './task.entity';
import type { CreateTaskDto } from './dto';

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
}
