import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from './auth.dto';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest() as Request;

    const accessToken = this.parseAccessTokenFromHeader(req);

    try {
      const secret = this.configService.get<string>('secret');
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        accessToken,
        { secret },
      );

      req['user'] = payload;

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private parseAccessTokenFromHeader(req: Request): string {
    const header = req.headers['authorization'] as string | undefined;
    if (!header)
      throw new UnauthorizedException('Authorization header not included');

    const [bearer, accessToken] = header.split(' ');
    if (bearer !== 'Bearer')
      throw new UnauthorizedException('Invalid Authorization header');

    if (!accessToken)
      throw new UnauthorizedException('Access token not included');

    return accessToken;
  }
}
