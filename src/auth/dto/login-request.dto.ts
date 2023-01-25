import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'email address of user' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'password of user' })
  @IsString()
  @MinLength(6)
  @MaxLength(256)
  password: string;
}
