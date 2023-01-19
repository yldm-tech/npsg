import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
