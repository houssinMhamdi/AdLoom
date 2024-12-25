import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { STATIC_ROLE } from './roles.decorator';
import { UerRole } from 'src/user/Enums/Roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UerRole[]>(
      STATIC_ROLE,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      console.log('User is not defined on the request.');
      return false;
    }

    console.log('Required Roles:', requiredRoles, 'User Role:', user.role);
    return requiredRoles.some((role) => user.role === role);
  }
}
