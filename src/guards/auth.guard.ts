import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Guard to check if a user is logged in
 */
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
