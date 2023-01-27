import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entity/base.entity';

@InputType()
export class ChatEntity extends BaseEntity {
  @IsString()
  email: string;

  @IsString()
  text: string;
}
