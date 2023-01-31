# Auth接口

依赖于`UserModule`、`JWTModule`和`PassportModule`，默认`token`有效期为30天

## 1. 用户注册

endpoint: `auth/register` POST 

请求：`RegisterInput`

| 字段名   | 类型   | 可空 |
| -------- | ------ | ---- |
| email    | String | 否   |
| password | String | 否   |

![register](/feature/auth/register.png)

## 2. 用户登陆

endpoint: `auth/login`  POST 

请求：`LoginInput`
| 字段名   | 类型   | 可空 |
| -------- | ------ | ---- |
| email    | String | 否   |
| password | String | 否   |

![login](/feature/auth/login.png)



## 3. 个人资料

endpoint: `auth/profile`  GET

请求: `Authorization` Bearer Token

![profile](/feature/auth/profile.png)


## 4. 修改密码

endpoint: `auth/profile`  GET

请求: `Authorization` Bearer Token

| 字段名   | 类型   | 可空 |
| -------- | ------ | ---- |
| newPassword    | String | 否   |

![update-password](/feature/auth/update-password.png)



## 4. google登陆

endpoint: `auth/google/login`  GET

![google-login](/feature/auth/google-login.png)

![google-callback](/feature/auth/google-callback.png)


## 代码目录结构
```
├── auth.controller.ts ==================================> 认证授权controller
├── auth.module.ts ======================================> 认证授权module
├── auth.resolver.ts ====================================> 认证授权resolver
├── auth.service.ts =====================================> 认证授权service 
├── dto
│   ├── google-user.dto.ts ==============================> google用户DTO
│   ├── login-request.dto.ts ============================> 用户登陆请求DTO
│   ├── login-response.dto.ts ===========================> 用户登陆返回DTO
│   ├── signup-request.dto.ts ===========================> 用户注册请求DTO
│   ├── update-password.request.ts ======================> 用户改密请求DTO
├── guard
│   ├── gql-auth.guard.ts ===============================> graphql认证守卫
│   ├── jwt-auth.guard.ts ===============================> restful认证守卫
├── interface
│   ├── jwt-payload.interface.ts ========================> jwt payload接口
│   └── user-context.interface.ts =======================> 用户上下文接口
└── strategy
    ├── google.strategy.ts ==============================> google认证策略
    ├── jwt.strategy.ts  ================================> JWT认证策略 
```