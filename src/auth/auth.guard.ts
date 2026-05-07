import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // Bearer <token>
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") || [];

    return type === "Bearer" ? token : undefined; 
  }
}
