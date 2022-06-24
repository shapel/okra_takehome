import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { PublicAuthGuard } from './auth/guards/public-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @PublicAuthGuard()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
