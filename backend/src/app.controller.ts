import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('ping')
  getPing() {
    return {
      message: 'pong from NestJS 🧩',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV ?? 'development',
    };
  }
}
