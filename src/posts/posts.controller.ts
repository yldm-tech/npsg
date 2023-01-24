import { PrismaClientExceptionFilter } from './../common/filter/prisma-client-exception_filter';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseFilters,
  CacheTTL,
  CacheKey,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.entity';
import { PrismaPromise } from '@prisma/client';

@Controller('posts')
@ApiTags('posts')
@UseInterceptors(CacheInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: Posts })
  create(@Body() createArticleDto: CreatePostDto) {
    return this.postsService.create(createArticleDto);
  }

  @Get('drafts')
  @ApiOkResponse({ type: Posts, isArray: true })
  findDrafts() {
    return this.postsService.findDrafts();
  }

  @CacheKey('all_posts')
  @CacheTTL(20)
  @Get()
  @UseFilters(new PrismaClientExceptionFilter())
  @ApiOkResponse({ type: Posts, isArray: true })
  findAll(): PrismaPromise<Array<Posts>> {
    return this.postsService.findAll({
      published: false,
      skip: 1,
      take: 25,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: Posts })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }

    return post;
  }

  @Patch(':id')
  @ApiOkResponse({ type: Posts })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Posts })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
