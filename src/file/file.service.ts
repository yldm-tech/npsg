import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { tar } from 'compression';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  upload(file: Express.Multer.File) {
    console.log(file);
  }

  uploads(files: Array<Express.Multer.File>) {
    console.log(files);
  }

  async downloadFile() {
    const uploadDir = this.configService.get('MULTER_DEST').root;
    console.log(uploadDir);
    const tarStream = new tar.Stream();
    await tarStream.addEntry(uploadDir);
    return { filename: 'test.tar', stream: tarStream };
  }
}
