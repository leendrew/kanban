import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  constructor() {}

  @Get('/ping')
  pong(): string {
    return 'pong';
  }
}
