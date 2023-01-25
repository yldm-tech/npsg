import {
  Field,
  HideField,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
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
  @Field((type) => String)
  email: string;

  @Field((type) => String, { nullable: true })
  name: string;

  @HideField()
  @Field((type) => String)
  password: string;

  @Field(() => [Role], { description: 'User Role' })
  roles: Role[] = [Role.User];
}
