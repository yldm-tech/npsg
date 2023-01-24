import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/common/pipe/file-size.pipe';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    this.fileService.upload(file);
    return true;
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    this.fileService.uploads(files);
    return true;
  }

  @Get('download')
  async downloadFile(@Res() res: Response) {
    const { filename, stream } = await this.fileService.downloadFile();
    res.headers.set('Content-Type', 'application/octet-stream');
    res.headers.set('Content-Disposition', `attachment; filename=${filename}`);
    return stream.pipe(res);
  }
}
