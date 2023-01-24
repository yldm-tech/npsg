import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { BaseEntity } from '../common/entity/base.entity';

@InputType('userInput')
@ObjectType('user')
export class UserEntity extends BaseEntity implements User {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  password: string;
}
