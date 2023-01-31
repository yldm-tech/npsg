# 使用场景
文件上传下载在一个应用中是一个非常常见的功能，鉴于目前主流的项目部署方式都是采用容器化部署，因此文件需要上传到第三方服务，最常见的就是AWS S3存储桶。因此需要在`.env中配置所需要的aws权限`
```shell
AWS_BUCKET_NAME=your bucket
AWS_REGION=ap-northeast-1
AWS_ACCESS_KEY_ID=your AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY=your AWS_SECRET_ACCESS_KEY
```

## 上传单文件
endpoint: `file/upload` POST
body参数: `file: File`
![upload](/feature/file/upload.png)

## 批量上传文件
endpoint: `file/uploads` POST
body参数: `file: Files`
![uploads](/feature/file/uploads.png)

## 下载文件
endpoint: `file/download` GET
query参数：path

![download](/feature/file/download.png)


## 代码目录结构


```
├── dto
│   ├── file-upload.dto.ts
│   └── files-upload.to.ts
├── file.controller.ts
├── file.module.ts
└── file.service.ts
```