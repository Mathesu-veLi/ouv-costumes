import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { productAlreadyExists, productNotExists } from '@/utils/throws';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private stripe = require('stripe')(process.env.STRAPI_KEY);

  async create(createProductDto: CreateProductDto) {
    await this.prismaService.products
      .findUniqueOrThrow({
        where: { name: createProductDto.name },
      })
      .then(() => productAlreadyExists());

    const strapiProduct = await this.stripe.prices.create({
      currency: 'brl',
      unit_amount_decimal: createProductDto.price.toString().replace('.', ''),
      product_data: {
        name: createProductDto.name,
      },
    });
    const prismaProduct = await this.prismaService.products.create({
      data: { ...createProductDto, priceId: strapiProduct.id },
    });

    return {
      prismaProduct,
      strapiProduct,
    };
  }

  findAll() {
    return this.prismaService.products.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.products
      .findUniqueOrThrow({ where: { id } })
      .catch(() => productNotExists());
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prismaService.products
      .update({
        where: { id },
        data: updateProductDto,
      })
      .catch((e) => {
        if (e.code === 'P2025') productNotExists();
      });
  }

  async remove(id: number) {
    return await this.prismaService.products
      .delete({ where: { id } })
      .catch((e) => {
        if (e.code === 'P2025') productNotExists();
      });
  }
}
