import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to get the current user from the request object
 */
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
