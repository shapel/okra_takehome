import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserInterface } from '../../users/interfaces/user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
