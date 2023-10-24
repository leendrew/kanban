import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto, RegisterDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
