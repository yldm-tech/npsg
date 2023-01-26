import {
  Controller,
  Get,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'stream';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOkResponse()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    const url = await this.fileService.upload(file);
    return {
      url: url,
    };
  }

  @ApiCreatedResponse()
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
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
    return await this.fileService.uploads(files);
  }

  @ApiOkResponse()
  @Get('download')
  async downloadFile(@Query('path') path: string, @Res() res: Response) {
    const file = await this.fileService.downloadFile(path);
    res.header('Content-Type', 'application/octet-stream');
    res.header('Content-Disposition', `attachment; filename="${path}"`);
    Readable.from(file as Buffer).pipe(res);
  }
}
