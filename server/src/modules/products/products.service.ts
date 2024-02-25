import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private stripe = require('stripe')(process.env.STRAPI_KEY);

  async create(createProductDto: CreateProductDto) {
    const strapiProduct = await this.stripe.prices.create({
      currency: 'brl',
      unit_amount_decimal: createProductDto.price.toString().replace('.', ''),
      product_data: {
        name: createProductDto.name,
      },
    });
    const prismaProduct = await this.prismaService.product.create({
      data: { ...createProductDto, priceId: strapiProduct.id },
    });

    return {
      prismaProduct,
      strapiProduct,
    };
  }

  findAll() {
    return this.prismaService.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
