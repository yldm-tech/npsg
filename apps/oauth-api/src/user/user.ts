import {
  Field,
  HideField,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsArray, IsString, IsUrl } from 'class-validator';
import { BaseEntity } from '@lantron-ltd/npsg-utils/src/entity/base.entity';

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
  @IsString()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String, { nullable: true })
  name: string;

  @IsUrl()
  @Field(() => String, { nullable: true })
  picture: string;

  @IsString()
  @Field(() => String, { nullable: true })
  googleId: string;

  @HideField()
  @Field(() => String)
  @Exclude()
  @IsString()
  password: string;

  @Field(() => [Role], { description: 'User Role' })
  @IsArray()
  roles: string[] = [Role.User];

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
