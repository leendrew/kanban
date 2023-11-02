import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto, RefreshDto } from './dto';
import type { CreateUserDto } from '../../shared/dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('/refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }
}
