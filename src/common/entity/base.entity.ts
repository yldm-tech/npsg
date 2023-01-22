import { Field, ID } from '@nestjs/graphql';

export class BaseEntity {
  @Field((type) => ID)
  id: number;

  @Field((type) => ID)
  createdAt: Date;

  @Field((type) => ID)
  updatedAt: Date;
}
