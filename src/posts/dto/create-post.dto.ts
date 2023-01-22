import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Field()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @Field()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  body: string;

  @IsNumber()
  @Field()
  authorId: number;

  @IsString()
  @Field()
  content: string | null;

  @IsBoolean()
  @IsOptional()
  @Field()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
