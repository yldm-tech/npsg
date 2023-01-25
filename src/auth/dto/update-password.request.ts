import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export default class UpdatePasswordInput {
  @Field(() => String)
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  newPassword: string;
}
