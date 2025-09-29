import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import CloudinaryUpload from './cloudnary.upload';

@Injectable()
export class UploadService {
  // Use to uploads product images locally
  //constructor(private readonly localUpload: LocalUpload) {}
  private cloudinaryUpload: CloudinaryUpload;

  constructor(cloudinaryService: CloudinaryService) {
    this.cloudinaryUpload = new CloudinaryUpload(cloudinaryService);
  }

  getFiles() {
    return this.cloudinaryUpload.getFiles();
  }

  async uploadFile(file: Express.Multer.File) {
    const result = await this.cloudinaryUpload.uploadFile(file);
    return result;
  }

  deleteFile(filename: string) {
    return this.cloudinaryUpload.deleteFile(filename);
  }
}
