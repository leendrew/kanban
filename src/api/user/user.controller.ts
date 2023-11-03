import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './entities';
import type { CreateUserDto } from '../../shared/dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.createOne(dto);
  }

  @Get('/')
  findAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.getOneBy({ id });
  }

  // @Patch('/:id')
  // update(@Param('id') id: string, @Body() updateUserDto: unknown) {
  // return this.userService.update(parseInt(id, 10), updateUserDto);
  // }

  // @Delete('/:id')
  // remove(@Param('id') id: string) {
  // return this.userService.remove(parseInt(id, 10));
  // }
}
