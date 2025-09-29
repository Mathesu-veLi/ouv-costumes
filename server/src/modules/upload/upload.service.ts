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

  uploadFile(file: Express.Multer.File) {
    return this.cloudinaryUpload.uploadFile(file);
  }

  deleteFile(filename: string) {
    return this.cloudinaryUpload.deleteFile(filename);
  }
}
