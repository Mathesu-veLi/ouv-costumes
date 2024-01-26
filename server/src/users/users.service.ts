import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: { ...createUserDto },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw e;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: { ...updateUserDto },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }
  }
}
