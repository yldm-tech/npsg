[返回功能介绍](/feature/)

# 使用场景

对用户的增删改查，用于辅助`AuthModule`和管理后台用



## 创建用户

在`ICreateUserInput`中定义了哪些参数是必须，哪些是可选

```typescript
export default interface ICreateUserInput {
  email: string; // 邮箱
  name?: string; // 名字
  picture?: string; // 头像
  googleId?: string; // google三方登陆
  encryptedPassword?: string; // hash密码
  roles?: Role[]; // 角色
}

```



```typescript
/**
   * 创建用户
   * @param email 邮箱
   * @param encryptedPassword 密码
   * @returns
   */
  create({
    email,
    name,
    encryptedPassword,
    googleId,
    roles,
    picture,
  }: ICreateUserInput): Promise<User | undefined> {
    return this.prismaService.user.create({
      data: {
        email: email,
        name: name || email,
        password: encryptedPassword,
        googleId: googleId,
        roles: roles,
        picture: picture,
      },
    });
  }
```



## 根据id查找用户

```typescript
/**
   *  根据id查找用户
   * @param userId userId
   * @returns user or null
   */
  async findOne(userId: number): Promise<User | undefined> {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
```



## 根据邮箱查找用户

```typescript
 /**
   * 根据email查找用户
   * @param email email
   * @returns user or null
   */
  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email: email },
    });
  }
```



## 根据googleId查找用户

```typescript

  /**
   * 通过googleId查询是否有注册账号
   * @param googleId
   * @returns
   */
  findByGoogleId(googleId: string) {
    return this.prismaService.user.findUnique({
      where: {
        googleId: googleId,
      },
    });
  }
```





## 修改用户密码

```typescript
/**
   * 更新用户密码
   * @param uuid 用户id
   * @param updatePasswordInput 用户输入的新密码
   * @returns user
   */
  async updateOne(
    uuid: number,
    updatePasswordInput: IUpdatePasswordInput,
  ): Promise<User | null> {
    const { newEncryptedPassword } = updatePasswordInput;
    const user = await this.findOne(uuid);
    if (!user) return null;
    await this.prismaService.user.update({
      where: {
        id: uuid,
      },
      data: {
        password: newEncryptedPassword,
      },
    });
    return user;
  }
```





## 代码目录结构

```
├── interface
│   ├── create-user-input.interface.ts
│   ├── update-password-inpput.interface.ts
│   └── update-user-input.interface.ts
├── user.constant.ts
├── user.module.ts
├── user.service.ts
└── user.ts
```

