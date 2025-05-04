import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get()
  getFiles() {
    return this.uploadService.getFiles();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadFile(file); // Delegando a lógica para o serviço
  }

  @Delete(':filename')
  deleteFile(@Param('filename') filename: string) {
    return this.uploadService.deleteFile(filename);
  }
}
