import{_ as s,c as n,o as a,b as e}from"./app.95294ce5.js";const _=JSON.parse('{"title":"功能列表","description":"","frontmatter":{},"headers":[],"relativePath":"feature/index.md","lastUpdated":1675177418000}'),p={name:"feature/index.md"},l=e(`<h1 id="功能列表" tabindex="-1">功能列表</h1><h3 id="认证授权" tabindex="-1">认证授权</h3><p>提供了用户认证模块常用的功能，包括注册登陆、Google三方登陆，基于RBAC的授权。</p><h3 id="即时聊天" tabindex="-1">即时聊天</h3><p>基于<code>websocket</code>搭建的即时聊天demo, 访问 <code>host/health</code></p><h3 id="定时任务" tabindex="-1">定时任务</h3><p>支持Cron表达式、延时调用、间隔调用等，同时可以动态获取、添加和删除定时任务和延时调用任务。</p><h3 id="上传下载" tabindex="-1">上传下载</h3><p>支持将单个文件或者批量文件上传到aws s3存储桶</p><h3 id="健康检查" tabindex="-1">健康检查</h3><p>对http服务、内存、硬盘、数据库、Redis等进进状态检查，可以访问<code>host/chat</code>查看</p><h3 id="文章crud" tabindex="-1">文章CRUD</h3><p>创建、修改、删除、查找等功能，对<code>prisma</code>的功能进行了演示</p><h3 id="数据库" tabindex="-1">数据库</h3><p>继承了PrismaClient，并重写了父类的构造方法，从环境变量中读取数据库配置，并添加了sql日志打印功能</p><h3 id="消息队列" tabindex="-1">消息队列</h3><p>基于redis的消息队列，能够缓解高并发带来的不稳定性</p><h3 id="用户管理" tabindex="-1">用户管理</h3><p>对用户的增删改查</p><h3 id="目录结构" tabindex="-1">目录结构</h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">src</span></span>
<span class="line"><span style="color:#e1e4e8;">├── auth =======================================&gt; 认证授权</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── dto </span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── guard</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── interface</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── strategy</span></span>
<span class="line"><span style="color:#e1e4e8;">├── chat =======================================&gt; 即时聊天</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── entities</span></span>
<span class="line"><span style="color:#e1e4e8;">├── common =====================================&gt; 通用组件</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── decorator</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── entity</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── filter</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── interceptor</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── middleware</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── pipe</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── scalar</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── constant</span></span>
<span class="line"><span style="color:#e1e4e8;">├── cron =======================================&gt; 定时任务</span></span>
<span class="line"><span style="color:#e1e4e8;">├── file =======================================&gt; 上传下载</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── dto</span></span>
<span class="line"><span style="color:#e1e4e8;">├── health =====================================&gt; 健康检查</span></span>
<span class="line"><span style="color:#e1e4e8;">├── mail  ======================================&gt; 邮件功能</span></span>
<span class="line"><span style="color:#e1e4e8;">├── order ======================================&gt; 订单(订阅)</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── dto</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── entities</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── listeners</span></span>
<span class="line"><span style="color:#e1e4e8;">├── posts  =====================================&gt; 文章(CRUD)</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── dto</span></span>
<span class="line"><span style="color:#e1e4e8;">├── prisma =====================================&gt; 数据库</span></span>
<span class="line"><span style="color:#e1e4e8;">├── queue  =====================================&gt; 消息队列</span></span>
<span class="line"><span style="color:#e1e4e8;">└── user   =====================================&gt; 用户管理</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">src</span></span>
<span class="line"><span style="color:#24292e;">├── auth =======================================&gt; 认证授权</span></span>
<span class="line"><span style="color:#24292e;">│   ├── dto </span></span>
<span class="line"><span style="color:#24292e;">│   ├── guard</span></span>
<span class="line"><span style="color:#24292e;">│   ├── interface</span></span>
<span class="line"><span style="color:#24292e;">│   └── strategy</span></span>
<span class="line"><span style="color:#24292e;">├── chat =======================================&gt; 即时聊天</span></span>
<span class="line"><span style="color:#24292e;">│   └── entities</span></span>
<span class="line"><span style="color:#24292e;">├── common =====================================&gt; 通用组件</span></span>
<span class="line"><span style="color:#24292e;">│   ├── decorator</span></span>
<span class="line"><span style="color:#24292e;">│   ├── entity</span></span>
<span class="line"><span style="color:#24292e;">│   ├── filter</span></span>
<span class="line"><span style="color:#24292e;">│   ├── interceptor</span></span>
<span class="line"><span style="color:#24292e;">│   ├── middleware</span></span>
<span class="line"><span style="color:#24292e;">│   ├── pipe</span></span>
<span class="line"><span style="color:#24292e;">│   └── scalar</span></span>
<span class="line"><span style="color:#24292e;">│   ├── constant</span></span>
<span class="line"><span style="color:#24292e;">├── cron =======================================&gt; 定时任务</span></span>
<span class="line"><span style="color:#24292e;">├── file =======================================&gt; 上传下载</span></span>
<span class="line"><span style="color:#24292e;">│   └── dto</span></span>
<span class="line"><span style="color:#24292e;">├── health =====================================&gt; 健康检查</span></span>
<span class="line"><span style="color:#24292e;">├── mail  ======================================&gt; 邮件功能</span></span>
<span class="line"><span style="color:#24292e;">├── order ======================================&gt; 订单(订阅)</span></span>
<span class="line"><span style="color:#24292e;">│   ├── dto</span></span>
<span class="line"><span style="color:#24292e;">│   ├── entities</span></span>
<span class="line"><span style="color:#24292e;">│   └── listeners</span></span>
<span class="line"><span style="color:#24292e;">├── posts  =====================================&gt; 文章(CRUD)</span></span>
<span class="line"><span style="color:#24292e;">│   └── dto</span></span>
<span class="line"><span style="color:#24292e;">├── prisma =====================================&gt; 数据库</span></span>
<span class="line"><span style="color:#24292e;">├── queue  =====================================&gt; 消息队列</span></span>
<span class="line"><span style="color:#24292e;">└── user   =====================================&gt; 用户管理</span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre></div>`,21),o=[l];function t(c,i,r,d,y,h){return a(),n("div",null,o)}const u=s(p,[["render",t]]);export{_ as __pageData,u as default};
