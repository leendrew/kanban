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
import { UserService } from './user.service';
import type { UserModel } from './user.types';
import type { GetUserQueryDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtGuard } from '../auth/jwt';

@UseGuards(JwtGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/')
  create(@Body() dto: CreateUserDto): Promise<UserModel> {
    return this.service.createOne(dto);
  }

  @Get('/')
  findAll(@Query() query: GetUserQueryDto): Promise<UserModel | UserModel[]> {
    const { login } = query;
    if (login) {
      return this.service.getOneBy({ login });
    }
    return this.service.getAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.service.getOneBy({ id });
  }

  @Patch('/:id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto): Promise<UserModel> {
    return this.service.updateOne(id, dto);
  }

  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.service.deleteOne(id);
  }
}
