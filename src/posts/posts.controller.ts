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
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './post.entity';
import { PrismaPromise } from '@prisma/client';

@ApiTags('posts')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'posts',
  version: VERSION_NEUTRAL,
})
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * 创建文章
   * @param createArticleDto dto
   * @returns
   */
  @Post()
  @ApiCreatedResponse({ type: Posts })
  create(@Body() createArticleDto: CreatePostDto) {
    return this.postsService.create(createArticleDto);
  }

  /**
   * 获取所有草稿
   * @returns
   */
  @Get('drafts')
  @ApiOkResponse({ type: Posts, isArray: true })
  findDrafts() {
    return this.postsService.findDrafts();
  }

  /**
   * 获取所有文章
   * @returns
   */
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

  /**
   * 根据id获取文章
   * @param id id
   * @returns
   */
  @Get(':id')
  @ApiOkResponse({ type: Posts })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }

    return post;
  }

  /**
   * 根据id修改文章
   * @param id id
   * @param updateArticleDto
   * @returns
   */
  @Patch(':id')
  @ApiOkResponse({ type: Posts })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updateArticleDto);
  }

  /**
   * 根据id删除文章
   * @param id id
   * @returns
   */
  @Delete(':id')
  @ApiOkResponse({ type: Posts })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
