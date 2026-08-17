import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() body: any) {
    await this.authService.changePassword(req.user.userId, body.newPassword);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('set-pin')
  async setPosPin(@Request() req: any, @Body() body: any) {
    await this.authService.setPosPin(req.user.userId, body.pin);
    return { success: true };
  }
}
