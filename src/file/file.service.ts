import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { processEnv } from 'src/common/constant/process-env';

@Injectable()
export class FileService {
  private logger = new Logger(FileService.name);
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId:
        processEnv.AWS_ACCESS_KEY_ID ||
        configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey:
        processEnv.AWS_SECRET_ACCESS_KEY ||
        configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: processEnv.AWS_REGION || configService.get<string>('AWS_REGION'),
    });
    this.s3 = new AWS.S3();
  }

  async upload(file: Express.Multer.File) {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const objectKey = `${new Date().getFullYear()}/${file.originalname}`;
    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
      ACL: 'public-read',
    };

    // upload
    try {
      await this.s3.upload(params).promise();
    } catch (err) {
      this.logger.error(err);
    }
    return this.getSignUrl(objectKey);
  }

  /**
   * 批量上传文件
   * @param files
   */
  async uploads(files: Array<Express.Multer.File>) {
    const urls = [];
    for (const file of files) {
      const url = await this.upload(file);
      urls.push({
        url: url,
      });
    }
    return urls;
  }

  async downloadFile(key: string) {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const file = await this.s3
      .getObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();

    return file.Body;
  }

  private getSignUrl(objectKey: string) {
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');

    // get signed url
    const url = this.s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 60,
    });
    return url;
  }
}
