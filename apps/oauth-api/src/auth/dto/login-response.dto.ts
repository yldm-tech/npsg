import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field(() => String, { description: 'jwt access token of user' })
  accessToken: string;
}
