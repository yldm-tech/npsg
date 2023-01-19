import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../user/user';
// user @User获取取user对象
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
