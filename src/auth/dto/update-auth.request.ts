import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { SignUpInput } from './signup-request.dto';

@InputType()
export class UpdateAuthInput extends PartialType(SignUpInput) {
  @Field(() => Int)
  id: number;
}
