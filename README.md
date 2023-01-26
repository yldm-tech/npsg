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
```
git add .
git cz
```
会出现引导，根据引导填写即可，最后执行`task changelog就会自动生成`[changelog](CHANGELOG.md)

```
Select the type of change that you're committing: 
(Use arrow keys)
❯ feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning 
of the code (white-space, formatting, missing 
semi-colons, etc) 
  refactor: A code change that neither fixes a bug 
(Move up and down to reveal more choices)
```