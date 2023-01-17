// definition of different routes/route handlers
// SwaggerModule searches for all @Body(), @Query() and @Param() decorators
// on the route handlers to generate API page
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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './create_post.dto';
import { UpdatePostDto } from './update_post.dto';
import { PostEntity } from './post.entity';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  create(@Body() createArticleDto: CreatePostDto) {
    return this.postsService.create(createArticleDto);
  }

  @Get('drafts')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findDrafts() {
    return this.postsService.findDrafts();
  }

  @Get()
  // @UseFilters(new Prisma_client_exceptionFilter())
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }

    return post;
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}