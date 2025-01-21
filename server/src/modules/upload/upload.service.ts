import { Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { fileNotFound } from '@/utils/throws';

@Injectable()
export class UploadService {
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
