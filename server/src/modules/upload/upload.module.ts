import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryProvider } from '../cloudinary/cloudinary.provider';

@Module({
  imports: [
    MulterModule.register({
      // Use to upload files locally
      /* storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          callback(null, `${Date.now()}${ext}`);
        },
      }),*/
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService, CloudinaryProvider],
  exports: [UploadService],
})
export class UploadModule {}
