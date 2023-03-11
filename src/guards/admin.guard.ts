import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Check if a user is signed in as an admin
 */
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // * AdminGuard will run before current user interceptor
    // * So we need to set up current user middleware
    if (!request.currentUser) {
      return false;
    }

    // Check if user is admin
    return request.currentUser.admin;
  }
}
