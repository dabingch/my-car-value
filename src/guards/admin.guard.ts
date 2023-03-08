import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // * AdminGuard will run before current user interceptor
    // * So we need to set up current user middleware
    // Check if user is signed in
    if (!request.currentUser) {
      return false;
    }

    // Check if user is admin
    return request.currentUser.admin;
  }
}
