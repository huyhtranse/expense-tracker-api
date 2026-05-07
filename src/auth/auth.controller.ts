import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from './loginDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('login')
  login(@Body() logInDto: LoginDto) {
    return this.authService.logIn(logInDto);
  }
}
