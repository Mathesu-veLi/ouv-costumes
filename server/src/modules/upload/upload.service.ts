import { Injectable } from '@nestjs/common';
import LocalUpload from './local.upload';

@Injectable()
export class UploadService {
  constructor(private readonly localUpload: LocalUpload) {}

  getFiles() {
    return this.localUpload.getFiles();
  }

  uploadFile(file: Express.Multer.File) {
    return this.localUpload.uploadFile(file);
  }

  deleteFile(filename: string) {
    return this.localUpload.deleteFile(filename);
  }
}
