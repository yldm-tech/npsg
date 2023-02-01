import{_ as s,c as n,o as a,b as p}from"./app.dff62eda.js";const A=JSON.parse('{"title":"使用场景","description":"","frontmatter":{},"headers":[],"relativePath":"feature/9-user.md","lastUpdated":1675222446000}'),l={name:"feature/9-user.md"},o=p(`<p><a href="/npsg/feature/">返回功能介绍</a></p><h1 id="使用场景" tabindex="-1">使用场景</h1><p>对用户的增删改查，用于辅助<code>AuthModule</code>和管理后台用</p><h2 id="创建用户" tabindex="-1">创建用户</h2><p>在<code>ICreateUserInput</code>中定义了哪些参数是必须，哪些是可选</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ICreateUserInput</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">email</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 邮箱</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 名字</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">picture</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 头像</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">googleId</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// google三方登陆</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">encryptedPassword</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// hash密码</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">roles</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Role</span><span style="color:#E1E4E8;">[]; </span><span style="color:#6A737D;">// 角色</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ICreateUserInput</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">email</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 邮箱</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 名字</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">picture</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 头像</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">googleId</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// google三方登陆</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">encryptedPassword</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// hash密码</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">roles</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Role</span><span style="color:#24292E;">[]; </span><span style="color:#6A737D;">// 角色</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 创建用户</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">email</span><span style="color:#6A737D;"> 邮箱</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">encryptedPassword</span><span style="color:#6A737D;"> 密码</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    email,</span></span>
<span class="line"><span style="color:#E1E4E8;">    name,</span></span>
<span class="line"><span style="color:#E1E4E8;">    encryptedPassword,</span></span>
<span class="line"><span style="color:#E1E4E8;">    googleId,</span></span>
<span class="line"><span style="color:#E1E4E8;">    roles,</span></span>
<span class="line"><span style="color:#E1E4E8;">    picture,</span></span>
<span class="line"><span style="color:#E1E4E8;">  }: ICreateUserInput): </span><span style="color:#79B8FF;">Promise</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">User </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return this.prismaService.user.create({</span></span>
<span class="line"><span style="color:#E1E4E8;">      data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        email: email,</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: name </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> email,</span></span>
<span class="line"><span style="color:#E1E4E8;">        password: encryptedPassword,</span></span>
<span class="line"><span style="color:#E1E4E8;">        googleId: googleId,</span></span>
<span class="line"><span style="color:#E1E4E8;">        roles: roles,</span></span>
<span class="line"><span style="color:#E1E4E8;">        picture: picture,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 创建用户</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">email</span><span style="color:#6A737D;"> 邮箱</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">encryptedPassword</span><span style="color:#6A737D;"> 密码</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    email,</span></span>
<span class="line"><span style="color:#24292E;">    name,</span></span>
<span class="line"><span style="color:#24292E;">    encryptedPassword,</span></span>
<span class="line"><span style="color:#24292E;">    googleId,</span></span>
<span class="line"><span style="color:#24292E;">    roles,</span></span>
<span class="line"><span style="color:#24292E;">    picture,</span></span>
<span class="line"><span style="color:#24292E;">  }: ICreateUserInput): </span><span style="color:#005CC5;">Promise</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">User </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    return this.prismaService.user.create({</span></span>
<span class="line"><span style="color:#24292E;">      data: {</span></span>
<span class="line"><span style="color:#24292E;">        email: email,</span></span>
<span class="line"><span style="color:#24292E;">        name: name </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> email,</span></span>
<span class="line"><span style="color:#24292E;">        password: encryptedPassword,</span></span>
<span class="line"><span style="color:#24292E;">        googleId: googleId,</span></span>
<span class="line"><span style="color:#24292E;">        roles: roles,</span></span>
<span class="line"><span style="color:#24292E;">        picture: picture,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="根据id查找用户" tabindex="-1">根据id查找用户</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   *  根据id查找用户</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">userId</span><span style="color:#6A737D;"> userId</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span><span style="color:#6A737D;"> user or null</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  async </span><span style="color:#B392F0;">findOne</span><span style="color:#E1E4E8;">(userId: number): </span><span style="color:#79B8FF;">Promise</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">User </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    return await this.prismaService.user.findUnique({</span></span>
<span class="line"><span style="color:#E1E4E8;">      where: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        id: userId,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   *  根据id查找用户</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">userId</span><span style="color:#6A737D;"> userId</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span><span style="color:#6A737D;"> user or null</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  async </span><span style="color:#6F42C1;">findOne</span><span style="color:#24292E;">(userId: number): </span><span style="color:#005CC5;">Promise</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">User </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    return await this.prismaService.user.findUnique({</span></span>
<span class="line"><span style="color:#24292E;">      where: {</span></span>
<span class="line"><span style="color:#24292E;">        id: userId,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="根据邮箱查找用户" tabindex="-1">根据邮箱查找用户</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据email查找用户</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">email</span><span style="color:#6A737D;"> email</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span><span style="color:#6A737D;"> user or null</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  async </span><span style="color:#B392F0;">findOneByEmail</span><span style="color:#E1E4E8;">(email: string) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.prismaService.user.</span><span style="color:#B392F0;">findUnique</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      where: { email: email },</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 根据email查找用户</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">email</span><span style="color:#6A737D;"> email</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span><span style="color:#6A737D;"> user or null</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  async </span><span style="color:#6F42C1;">findOneByEmail</span><span style="color:#24292E;">(email: string) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.prismaService.user.</span><span style="color:#6F42C1;">findUnique</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      where: { email: email },</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="根据googleid查找用户" tabindex="-1">根据googleId查找用户</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 通过googleId查询是否有注册账号</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">googleId</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">findByGoogleId</span><span style="color:#E1E4E8;">(googleId: string) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.prismaService.user.</span><span style="color:#B392F0;">findUnique</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      where: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        googleId: googleId,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 通过googleId查询是否有注册账号</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">googleId</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">findByGoogleId</span><span style="color:#24292E;">(googleId: string) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.prismaService.user.</span><span style="color:#6F42C1;">findUnique</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      where: {</span></span>
<span class="line"><span style="color:#24292E;">        googleId: googleId,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="修改用户密码" tabindex="-1">修改用户密码</h2><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 更新用户密码</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">uuid</span><span style="color:#6A737D;"> 用户id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">updatePasswordInput</span><span style="color:#6A737D;"> 用户输入的新密码</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#F97583;">@returns</span><span style="color:#6A737D;"> user</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#E1E4E8;">  async </span><span style="color:#B392F0;">updateOne</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    uuid: number,</span></span>
<span class="line"><span style="color:#E1E4E8;">    updatePasswordInput: IUpdatePasswordInput,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ): </span><span style="color:#79B8FF;">Promise</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">User </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    const { newEncryptedPassword } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> updatePasswordInput;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">user</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">findOne</span><span style="color:#E1E4E8;">(uuid);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">user) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.prismaService.user.</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      where: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        id: uuid,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      data: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        password: newEncryptedPassword,</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> user;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">   * 更新用户密码</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">uuid</span><span style="color:#6A737D;"> 用户id</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">updatePasswordInput</span><span style="color:#6A737D;"> 用户输入的新密码</span></span>
<span class="line"><span style="color:#6A737D;">   * </span><span style="color:#D73A49;">@returns</span><span style="color:#6A737D;"> user</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  async </span><span style="color:#6F42C1;">updateOne</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    uuid: number,</span></span>
<span class="line"><span style="color:#24292E;">    updatePasswordInput: IUpdatePasswordInput,</span></span>
<span class="line"><span style="color:#24292E;">  ): </span><span style="color:#005CC5;">Promise</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">User </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    const { newEncryptedPassword } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> updatePasswordInput;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">user</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">findOne</span><span style="color:#24292E;">(uuid);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">user) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.prismaService.user.</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      where: {</span></span>
<span class="line"><span style="color:#24292E;">        id: uuid,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      data: {</span></span>
<span class="line"><span style="color:#24292E;">        password: newEncryptedPassword,</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> user;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span></code></pre></div><h2 id="代码目录结构" tabindex="-1">代码目录结构</h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── interface</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── create-user-input.interface.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── update-password-inpput.interface.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── update-user-input.interface.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">├── user.constant.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">├── user.module.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">├── user.service.ts</span></span>
<span class="line"><span style="color:#e1e4e8;">└── user.ts</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── interface</span></span>
<span class="line"><span style="color:#24292e;">│   ├── create-user-input.interface.ts</span></span>
<span class="line"><span style="color:#24292e;">│   ├── update-password-inpput.interface.ts</span></span>
<span class="line"><span style="color:#24292e;">│   └── update-user-input.interface.ts</span></span>
<span class="line"><span style="color:#24292e;">├── user.constant.ts</span></span>
<span class="line"><span style="color:#24292e;">├── user.module.ts</span></span>
<span class="line"><span style="color:#24292e;">├── user.service.ts</span></span>
<span class="line"><span style="color:#24292e;">└── user.ts</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre></div>`,17),e=[o];function c(r,t,y,E,i,d){return a(),n("div",null,e)}const D=s(l,[["render",c]]);export{A as __pageData,D as default};
