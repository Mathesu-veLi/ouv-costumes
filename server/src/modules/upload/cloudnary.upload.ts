import { noImageProvided } from '@/utils/throws';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

export default class CloudinaryUpload {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: Express.Multer.File) {
    if (!file) noImageProvided();

    const uploaded = await this.cloudinaryService.uploadImage(file);

    return {
      message: 'File uploaded to Cloudinary',
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  async deleteFile(publicId: string) {
    const result = await this.cloudinaryService.deleteImage(publicId);

    if (result.result !== 'ok') {
      throw new Error('Failed to delete file');
    }

    return { message: 'File deleted from Cloudinary' };
  }

  async getFiles() {
    return { message: 'Listing not supported in Cloudinary free plan' };
  }
}
