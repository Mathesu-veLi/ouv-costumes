import { fileNotFound, noImageProvided } from '@/utils/throws';
import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, unlinkSync } from 'fs';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      noImageProvided();
    }

    return { message: 'File uploaded successfully', filename: file.filename };
  }

  @Delete(':filename')
  deleteFile(@Param('filename') filename: string) {
    const path = `./uploads/${filename}`;
    if (!existsSync(path)) {
      fileNotFound();
    }

    try {
      unlinkSync(path);
      return { message: 'File deleted successfully' };
    } catch (e) {
      console.error(e);
      return { message: 'Failed to delete file' };
    }
  }
}
