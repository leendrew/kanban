import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './user.entity';
import type { GetUserDto, CreateUserDto, UpdateUserDto } from './dto';

@Controller('/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/')
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(@Body() dto: GetUserDto): Promise<User | null | User[]> {
    if (dto.login) {
      return this.service.getOneBy({ login: dto.login });
    }
    return this.service.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.service.getOneBy({ id });
  }

  @Patch('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.service.updateOne(id, dto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteOne(id);
  }
}
