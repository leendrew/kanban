import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto, RefreshDto } from './dto';
import type { CreateUserDto } from '../user/dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.service.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @Post('/refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.service.refresh(dto);
  }
}
