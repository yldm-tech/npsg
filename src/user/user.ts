import {
  Field,
  HideField,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../common/entity/base.entity';

export enum Role {
  User = 'User', // basic, shared, default access scope
  Seller = 'Seller',
  Buyer = 'Buyer',
  Admin = 'Admin',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'Different User Role types',
  valuesMap: {
    User: {
      description: 'Basic, shared, default user access scope',
    },
  },
});

@InputType('userInput')
@ObjectType('user')
export class UserEntity extends BaseEntity implements User {
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  name: string;

  @HideField()
  @Field(() => String)
  @Exclude()
  password: string;

  @Field(() => [Role], { description: 'User Role' })
  roles: string[] = [Role.User];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
