import { Field, HideField, InputType } from '@nestjs/graphql';
import { AppConfig } from '@prisma/client';
import { BaseEntity } from './base.entity';

@InputType()
export class AppConfigEntity extends BaseEntity implements AppConfig {
  @Field((type) => String)
  key: string;

  @Field((type) => String)
  value: string;

  @HideField()
  static restartCount = 0;
}
