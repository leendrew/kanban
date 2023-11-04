import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './entities';
import type { CreateUserDto } from '../../shared/dto';

@Controller('/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/')
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.service.getOneBy({ id });
  }

  @Patch('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: unknown) {
    return this.service.updateOneBy(id, updateUserDto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteOneBy(id);
  }
}
