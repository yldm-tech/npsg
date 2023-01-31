import{_ as s,c as n,o as a,b as e}from"./app.59a3fc6e.js";const h=JSON.parse('{"title":"功能介绍","description":"","frontmatter":{},"headers":[],"relativePath":"components/index.md","lastUpdated":1675154306000}'),p={name:"components/index.md"},l=e(`<h1 id="功能介绍" tabindex="-1">功能介绍</h1><h3 id="目录结构" tabindex="-1">目录结构</h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">src</span></span>
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
<span class="line"><span style="color:#24292e;"></span></span></code></pre></div>`,3),o=[l];function t(c,r,i,y,d,g){return a(),n("div",null,o)}const m=s(p,[["render",t]]);export{h as __pageData,m as default};
