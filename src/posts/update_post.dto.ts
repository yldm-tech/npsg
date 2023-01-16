import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create_post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
