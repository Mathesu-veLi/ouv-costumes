import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
