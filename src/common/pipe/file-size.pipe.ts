import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 1000;
    return value.size < oneKb;
  }
}
