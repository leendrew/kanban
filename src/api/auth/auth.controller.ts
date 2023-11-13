import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthResponse } from './auth.types';
import type { RegisterDto, LoginDto, RefreshDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.service.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.service.login(dto);
  }

  @Post('/refresh')
  refresh(@Body() dto: RefreshDto): Promise<AuthResponse> {
    return this.service.refresh(dto);
  }
}
