import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';
import { BaseEntity } from '../common/entity/base.entity';

export class PostEntity extends BaseEntity implements Post {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  authorId: number;

  @ApiProperty()
  content: string | null;

  @ApiProperty()
  published: boolean;
}
