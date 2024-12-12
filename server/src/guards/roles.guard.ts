import { ROLES_KEY } from '@/decorators/roles.decorators';
import { LoginPayload } from '@/modules/token/dto/loginPayload.dto';
import { Role } from '@prisma/client';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;
    const token = authorization.slice(7, authorization.length);

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(token, { secret: process.env.TOKEN_SECRET })
      .catch(() => undefined);
    if (!loginPayload) return false;

    return requiredRoles.some((role) => role === loginPayload.role);
  }
}
