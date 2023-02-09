import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
