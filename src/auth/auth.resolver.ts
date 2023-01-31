import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentGqlUser } from 'src/common/decorator/current-user.decorator';
import { UserEntity } from 'src/user/user';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login-request.dto';
import { RegisterInput } from './dto/signup-request.dto';
import UpdatePasswordInput from './dto/update-password.request';
import IUserContext from './interface/user-context.interface';
import { User } from '@prisma/client';
import { GqlAuthGuard } from './guard/gql-auth.guard';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  signup(@Args('signupInput') signupInput: RegisterInput) {
    return this.authService.register(signupInput);
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity, { name: 'profile', nullable: true })
  async getCurrentUser(@CurrentGqlUser() user): Promise<User> {
    return this.authService.findUserById(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserEntity, { nullable: true })
  updatePassword(
    @CurrentGqlUser() userContext: IUserContext,
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput,
  ) {
    return this.authService.updatePassword(
      userContext.userId,
      updatePasswordInput,
    );
  }
}
