import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../common/entity/base.entity';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '@prisma/client';

@ObjectType({ description: 'post ' })
export class Posts extends BaseEntity implements Post {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string | null;

  @Field()
  body: string;

  @Field()
  authorId: number;

  @Field({ nullable: true })
  content: string | null;

  @Field()
  published: boolean;
}
