import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create_article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
