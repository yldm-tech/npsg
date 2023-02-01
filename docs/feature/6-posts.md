#### [返回功能介绍](/feature/)
## 说明

示例了controller中如何定义`GET`、`POST`、`PUT`、`DELETE` 等不同的请求，同时对`path`参数、`body`参数、`query`参数的使用都有对应参考代码，

示例中还集成了缓存功能、Swagger和多版本API。



## 创建文章

```typescript
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
```



## 获取所有文章

```typescript
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
```







## 根据path参数的id获取单个文章

```typescript
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
```



## 根据path参数的id修改文章

```typescript
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
```



## 根据path参数的id删除文章

```typescript
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
```





## 代码目录结构

```typescript
├── dto
│   ├── create-post.dto.ts
│   ├── posts.args.ts
│   └── update-post.dto.ts
├── post.constant.ts
├── post.entity.ts
├── posts.controller.ts
├── posts.module.ts
├── posts.resolver.ts
└── posts.service.ts
```

