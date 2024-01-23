import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.strategy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly JwtAuthGuard: JwtAuthGuard) { }

  @UseGuards(JwtAuthGuard)
  @Get('auth/login')
  getProfile(@Request() req) {
    return req.user;
  }
}
