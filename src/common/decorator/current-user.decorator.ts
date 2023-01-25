import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import IUserContext from 'src/auth/interface/user-context.interface';

/**
 * graphql环境下获取当前用户
 */
export const CurrentGqlUser = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

// user @User获取取user对象
export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUserContext;
  },
);
