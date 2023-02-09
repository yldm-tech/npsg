import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '@prisma/client';
import { BaseEntity } from '@lantron-ltd/npsg-utils/src/entity/base.entity';

@ObjectType({ description: 'post' })
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
