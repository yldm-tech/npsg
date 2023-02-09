import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

import { BaseEntity } from '@lantron-ltd/npsg-utils';

@InputType()
export class ChatEntity extends BaseEntity {
  @IsString()
  email: string;

  @IsString()
  text: string;
}
