# 如何使用
```
yarn
cp .env.example .env
yarn dev
open http://localhost:3000/docs
```

# 技术栈
- nestjs
- prisma
- swagger(http://localhost:3000/docs)
- express
- test.http

# changelog
- feat:新功能
- fix：修补
- docs:文档
- style:格式
- refactor:重构（既不是新增，也不是代码变动）
- test：增加测试
- chore：构建过程中或辅助工具的变动。

```
feat: 需求(123) 新增了某某功能

详细描述某某功能（可省略）

```
打版本之后运行`task changelog会自动添加更新日志到`[changelog](CHANGELOG.md)
