import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String, { description: ' email address of user' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: ' password of user' })
  @IsString()
  @MaxLength(256)
  password: string;
}
