import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './loginDto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async logIn(logInDto: LoginDto) {
    const jwtSecret = this.configService.get<string>('JWT_SECRET') ?? '';
    console.log('[AuthService] JWT_SECRET at login:', jwtSecret);

    const user = this.userService.findOne(logInDto.username);

    if (!user || user.password !== logInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
