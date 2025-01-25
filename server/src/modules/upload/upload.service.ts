import { Injectable } from '@nestjs/common';
import { fileNotFound, noImageProvided } from '@/utils/throws';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  uploadFile(file: Express.Multer.File) {
    if (!file) {
      noImageProvided();
    }

    return { message: 'File uploaded successfully', filename: file.filename };
  }

  deleteFile(filename: string) {
    const path = `./uploads/${filename}`;
    if (!existsSync(path)) {
      fileNotFound();
    }

    try {
      unlinkSync(path);
      return { message: 'File deleted successfully' };
    } catch (e) {
      console.error(e);
      throw new Error('Failed to delete file');
    }
  }
}
