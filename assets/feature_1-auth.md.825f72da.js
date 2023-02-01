import{_ as s,c as e,o as t,b as a}from"./app.6ef46020.js";const n="/npsg/feature/auth/register.png",p="/npsg/feature/auth/login.png",o="/npsg/feature/auth/profile.png",l="/npsg/feature/auth/update-password.png",r="/npsg/feature/auth/google-login.png",c="/npsg/feature/auth/google-callback.png",w=JSON.parse('{"title":"Auth接口","description":"","frontmatter":{},"headers":[],"relativePath":"feature/1-auth.md","lastUpdated":1675180285000}'),d={name:"feature/1-auth.md"},i=a('<h4 id="返回功能介绍" tabindex="-1"><a href="/npsg/feature/">返回功能介绍</a></h4><hr><h1 id="auth接口" tabindex="-1">Auth接口</h1><p>依赖于<code>UserModule</code>、<code>JWTModule</code>和<code>PassportModule</code>，默认<code>token</code>有效期为30天</p><h2 id="_1-用户注册" tabindex="-1">1. 用户注册</h2><p>endpoint: <code>auth/register</code> POST</p><p>请求：<code>RegisterInput</code></p><table><thead><tr><th>字段名</th><th>类型</th><th>可空</th></tr></thead><tbody><tr><td>email</td><td>String</td><td>否</td></tr><tr><td>password</td><td>String</td><td>否</td></tr></tbody></table><p><img src="'+n+'" alt="register"></p><h2 id="_2-用户登陆" tabindex="-1">2. 用户登陆</h2><p>endpoint: <code>auth/login</code> POST</p><p>请求：<code>LoginInput</code></p><table><thead><tr><th>字段名</th><th>类型</th><th>可空</th></tr></thead><tbody><tr><td>email</td><td>String</td><td>否</td></tr><tr><td>password</td><td>String</td><td>否</td></tr></tbody></table><p><img src="'+p+'" alt="login"></p><h2 id="_3-个人资料" tabindex="-1">3. 个人资料</h2><p>endpoint: <code>auth/profile</code> GET</p><p>请求: <code>Authorization</code> Bearer Token</p><p><img src="'+o+'" alt="profile"></p><h2 id="_4-修改密码" tabindex="-1">4. 修改密码</h2><p>endpoint: <code>auth/profile</code> GET</p><p>请求: <code>Authorization</code> Bearer Token</p><table><thead><tr><th>字段名</th><th>类型</th><th>可空</th></tr></thead><tbody><tr><td>newPassword</td><td>String</td><td>否</td></tr></tbody></table><p><img src="'+l+'" alt="update-password"></p><h2 id="_4-google登陆" tabindex="-1">4. google登陆</h2><p>endpoint: <code>auth/google/login</code> GET</p><p><img src="'+r+'" alt="google-login"></p><p><img src="'+c+`" alt="google-callback"></p><h2 id="代码目录结构" tabindex="-1">代码目录结构</h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── auth.controller.ts ==================================&gt; 认证授权controller</span></span>
<span class="line"><span style="color:#e1e4e8;">├── auth.module.ts ======================================&gt; 认证授权module</span></span>
<span class="line"><span style="color:#e1e4e8;">├── auth.resolver.ts ====================================&gt; 认证授权resolver</span></span>
<span class="line"><span style="color:#e1e4e8;">├── auth.service.ts =====================================&gt; 认证授权service </span></span>
<span class="line"><span style="color:#e1e4e8;">├── dto</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── google-user.dto.ts ==============================&gt; google用户DTO</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── login-request.dto.ts ============================&gt; 用户登陆请求DTO</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── login-response.dto.ts ===========================&gt; 用户登陆返回DTO</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── signup-request.dto.ts ===========================&gt; 用户注册请求DTO</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── update-password.request.ts ======================&gt; 用户改密请求DTO</span></span>
<span class="line"><span style="color:#e1e4e8;">├── guard</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── gql-auth.guard.ts ===============================&gt; graphql认证守卫</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── jwt-auth.guard.ts ===============================&gt; restful认证守卫</span></span>
<span class="line"><span style="color:#e1e4e8;">├── interface</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── jwt-payload.interface.ts ========================&gt; jwt payload接口</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── user-context.interface.ts =======================&gt; 用户上下文接口</span></span>
<span class="line"><span style="color:#e1e4e8;">└── strategy</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├── google.strategy.ts ==============================&gt; google认证策略</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├── jwt.strategy.ts  ================================&gt; JWT认证策略 </span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── auth.controller.ts ==================================&gt; 认证授权controller</span></span>
<span class="line"><span style="color:#24292e;">├── auth.module.ts ======================================&gt; 认证授权module</span></span>
<span class="line"><span style="color:#24292e;">├── auth.resolver.ts ====================================&gt; 认证授权resolver</span></span>
<span class="line"><span style="color:#24292e;">├── auth.service.ts =====================================&gt; 认证授权service </span></span>
<span class="line"><span style="color:#24292e;">├── dto</span></span>
<span class="line"><span style="color:#24292e;">│   ├── google-user.dto.ts ==============================&gt; google用户DTO</span></span>
<span class="line"><span style="color:#24292e;">│   ├── login-request.dto.ts ============================&gt; 用户登陆请求DTO</span></span>
<span class="line"><span style="color:#24292e;">│   ├── login-response.dto.ts ===========================&gt; 用户登陆返回DTO</span></span>
<span class="line"><span style="color:#24292e;">│   ├── signup-request.dto.ts ===========================&gt; 用户注册请求DTO</span></span>
<span class="line"><span style="color:#24292e;">│   ├── update-password.request.ts ======================&gt; 用户改密请求DTO</span></span>
<span class="line"><span style="color:#24292e;">├── guard</span></span>
<span class="line"><span style="color:#24292e;">│   ├── gql-auth.guard.ts ===============================&gt; graphql认证守卫</span></span>
<span class="line"><span style="color:#24292e;">│   ├── jwt-auth.guard.ts ===============================&gt; restful认证守卫</span></span>
<span class="line"><span style="color:#24292e;">├── interface</span></span>
<span class="line"><span style="color:#24292e;">│   ├── jwt-payload.interface.ts ========================&gt; jwt payload接口</span></span>
<span class="line"><span style="color:#24292e;">│   └── user-context.interface.ts =======================&gt; 用户上下文接口</span></span>
<span class="line"><span style="color:#24292e;">└── strategy</span></span>
<span class="line"><span style="color:#24292e;">    ├── google.strategy.ts ==============================&gt; google认证策略</span></span>
<span class="line"><span style="color:#24292e;">    ├── jwt.strategy.ts  ================================&gt; JWT认证策略 </span></span>
<span class="line"><span style="color:#24292e;"></span></span></code></pre></div>`,29),g=[i];function h(u,y,_,f,b,m){return t(),e("div",null,g)}const v=s(d,[["render",h]]);export{w as __pageData,v as default};
