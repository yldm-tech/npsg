import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { UserEntity } from './user';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query((returns) => UserEntity)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<UserEntity> {
    console.log('@@@@@@@@@@', username, password);
    return this.usersService.findOne(username);
  }

  @Query((returns) => UserEntity)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: UserEntity) {
    return this.usersService.findOne(user.name);
  }
}
