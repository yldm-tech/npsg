import{_ as s,c as n,o as a,b as p}from"./app.dff62eda.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"feature/6-posts.md","lastUpdated":1675218893000}'),l={name:"feature/6-posts.md"},o=p(`<h4 id="返回功能介绍" tabindex="-1"><a href="/npsg/feature/">返回功能介绍</a></h4><h2 id="说明" tabindex="-1">说明</h2><p>示例了controller中如何定义<code>GET</code>、<code>POST</code>、<code>PUT</code>、<code>DELETE</code> 等不同的请求，同时对<code>path</code>参数、<code>body</code>参数、<code>query</code>参数的使用都有对应参考代码，</p><p>示例中还集成了缓存功能、Swagger和多版本API。</p><h2 id="创建文章" tabindex="-1">创建文章</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 创建文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">createArticleDto</span><span style="color:#6A737D;"> dto</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Post</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiCreatedResponse</span><span style="color:#E1E4E8;">({ type: Posts })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">Body</span><span style="color:#E1E4E8;">() createArticleDto: CreatePostDto) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.postsService.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(createArticleDto);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 创建文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">createArticleDto</span><span style="color:#6A737D;"> dto</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Post</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiCreatedResponse</span><span style="color:#24292E;">({ type: Posts })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">Body</span><span style="color:#24292E;">() createArticleDto: CreatePostDto) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.postsService.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(createArticleDto);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="获取所有文章" tabindex="-1">获取所有文章</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 获取所有文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">CacheKey</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;all_posts&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">CacheTTL</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">UseFilters</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PrismaClientExceptionFilter</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiOkResponse</span><span style="color:#E1E4E8;">({ type: Posts, isArray: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">findAll</span><span style="color:#E1E4E8;">(): PrismaPromise</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Array</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Posts</span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return this.postsService.findAll({</span></span>
<span class="line"><span style="color:#E1E4E8;">      published: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      skip: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      take: </span><span style="color:#79B8FF;">25</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 获取所有文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">CacheKey</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;all_posts&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">CacheTTL</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">20</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Get</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">UseFilters</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PrismaClientExceptionFilter</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiOkResponse</span><span style="color:#24292E;">({ type: Posts, isArray: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">findAll</span><span style="color:#24292E;">(): PrismaPromise</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Array</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Posts</span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    return this.postsService.findAll({</span></span>
<span class="line"><span style="color:#24292E;">      published: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      skip: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      take: </span><span style="color:#005CC5;">25</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="根据path参数的id获取单个文章" tabindex="-1">根据path参数的id获取单个文章</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据id获取文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">id</span><span style="color:#6A737D;"> id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;:id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiOkResponse</span><span style="color:#E1E4E8;">({ type: Posts })</span></span>
<span class="line"><span style="color:#E1E4E8;">  async </span><span style="color:#B392F0;">findOne</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">Param</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;id&#39;</span><span style="color:#E1E4E8;">, ParseIntPipe) id: number): </span><span style="color:#79B8FF;">Promise</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Posts</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    const post </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.postsService.</span><span style="color:#B392F0;">findOne</span><span style="color:#E1E4E8;">(id);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (!</span><span style="color:#FFAB70;">post</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NotFoundException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`Article with \${</span><span style="color:#E1E4E8;">id</span><span style="color:#9ECBFF;">} does not exist.\`</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    return post;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据id获取文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">id</span><span style="color:#6A737D;"> id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;:id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiOkResponse</span><span style="color:#24292E;">({ type: Posts })</span></span>
<span class="line"><span style="color:#24292E;">  async </span><span style="color:#6F42C1;">findOne</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">Param</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;id&#39;</span><span style="color:#24292E;">, ParseIntPipe) id: number): </span><span style="color:#005CC5;">Promise</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Posts</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    const post </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.postsService.</span><span style="color:#6F42C1;">findOne</span><span style="color:#24292E;">(id);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (!</span><span style="color:#E36209;">post</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NotFoundException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`Article with \${</span><span style="color:#24292E;">id</span><span style="color:#032F62;">} does not exist.\`</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    return post;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="根据path参数的id修改文章" tabindex="-1">根据path参数的id修改文章</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据id修改文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">id</span><span style="color:#6A737D;"> id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">updateArticleDto</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Patch</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;:id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiOkResponse</span><span style="color:#E1E4E8;">({ type: Posts })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#B392F0;">Param</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;id&#39;</span><span style="color:#E1E4E8;">, ParseIntPipe) id: number,</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#B392F0;">Body</span><span style="color:#E1E4E8;">() updateArticleDto: UpdatePostDto,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.postsService.</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(id, updateArticleDto);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据id修改文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">id</span><span style="color:#6A737D;"> id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">updateArticleDto</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Patch</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;:id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiOkResponse</span><span style="color:#24292E;">({ type: Posts })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#6F42C1;">Param</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;id&#39;</span><span style="color:#24292E;">, ParseIntPipe) id: number,</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#6F42C1;">Body</span><span style="color:#24292E;">() updateArticleDto: UpdatePostDto,</span></span>
<span class="line"><span style="color:#24292E;">  ) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.postsService.</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">(id, updateArticleDto);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="根据path参数的id删除文章" tabindex="-1">根据path参数的id删除文章</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据id删除文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">id</span><span style="color:#6A737D;"> id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">Delete</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;:id&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#B392F0;">ApiOkResponse</span><span style="color:#E1E4E8;">({ type: Posts })</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(@</span><span style="color:#B392F0;">Param</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;id&#39;</span><span style="color:#E1E4E8;">, ParseIntPipe) id: number) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.postsService.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(id);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据id删除文章</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">id</span><span style="color:#6A737D;"> id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">Delete</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;:id&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#6F42C1;">ApiOkResponse</span><span style="color:#24292E;">({ type: Posts })</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(@</span><span style="color:#6F42C1;">Param</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;id&#39;</span><span style="color:#24292E;">, ParseIntPipe) id: number) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.postsService.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(id);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="代码目录结构" tabindex="-1">代码目录结构</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">├── dto</span></span>
<span class="line"><span style="color:#E1E4E8;">│   ├── create</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">post.dto.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">│   ├── posts.args.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">│   └── update</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">post.dto.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">├── post.constant.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">├── post.entity.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">├── posts.controller.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">├── posts.module.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">├── posts.resolver.ts</span></span>
<span class="line"><span style="color:#E1E4E8;">└── posts.service.ts</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">├── dto</span></span>
<span class="line"><span style="color:#24292E;">│   ├── create</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">post.dto.ts</span></span>
<span class="line"><span style="color:#24292E;">│   ├── posts.args.ts</span></span>
<span class="line"><span style="color:#24292E;">│   └── update</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">post.dto.ts</span></span>
<span class="line"><span style="color:#24292E;">├── post.constant.ts</span></span>
<span class="line"><span style="color:#24292E;">├── post.entity.ts</span></span>
<span class="line"><span style="color:#24292E;">├── posts.controller.ts</span></span>
<span class="line"><span style="color:#24292E;">├── posts.module.ts</span></span>
<span class="line"><span style="color:#24292E;">├── posts.resolver.ts</span></span>
<span class="line"><span style="color:#24292E;">└── posts.service.ts</span></span>
<span class="line"></span></code></pre></div>`,16),e=[o];function t(c,r,y,E,i,d){return a(),n("div",null,e)}const D=s(l,[["render",t]]);export{A as __pageData,D as default};
