import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { userExists } from './utils/userExists';

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
    if (!(await userExists(this.prismaService, id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!(await userExists(this.prismaService, id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.prismaService.user.update({
      data: { ...updateUserDto },
      where: { id },
    });
  }

  async remove(id: number) {
    if (!(await userExists(this.prismaService, id)))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.prismaService.user.delete({ where: { id } });
  }
}
